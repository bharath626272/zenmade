require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const GOOGLE_SERVICE_ACCOUNT_JSON_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_FILE || process.env.GOOGLE_APPLICATION_CREDENTIALS;
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

function parseServiceAccountJson(value) {
  if (!value) return null;

  if (value.startsWith('{')) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  return null;
}

function loadServiceAccountJson() {
  if (GOOGLE_SERVICE_ACCOUNT_JSON && GOOGLE_SERVICE_ACCOUNT_JSON.trim().startsWith('{')) {
    return parseServiceAccountJson(GOOGLE_SERVICE_ACCOUNT_JSON);
  }

  if (!GOOGLE_SERVICE_ACCOUNT_JSON_FILE) {
    return null;
  }

  const resolvedPath = path.isAbsolute(GOOGLE_SERVICE_ACCOUNT_JSON_FILE)
    ? GOOGLE_SERVICE_ACCOUNT_JSON_FILE
    : path.join(__dirname, GOOGLE_SERVICE_ACCOUNT_JSON_FILE);

  if (!fs.existsSync(resolvedPath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    return parseServiceAccountJson(raw.trim());
  } catch (error) {
    console.error('Could not read service account JSON file:', error);
    return null;
  }
}

async function forwardToGoogleSheet(payload) {
  const serviceAccount = loadServiceAccountJson();
  const row = [
    payload.name || '',
    payload.email || '',
    payload.company || '',
    payload.phone || '',
    payload.subject || '',
    payload.message || '',
    payload.submittedAt || new Date().toISOString(),
  ];

  if (GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return { forwarded: true, provider: 'webhook' };
      }

      const errorText = await response.text().catch(() => '');
      return { forwarded: false, provider: 'webhook', status: response.status, error: errorText };
    } catch (error) {
      console.error('Could not forward contact form via webhook:', error);
      return { forwarded: false, provider: 'webhook', error: error.message };
    }
  }

  if (!GOOGLE_SHEET_ID || !serviceAccount) {
    return { forwarded: false, reason: 'not-configured' };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return { forwarded: true, provider: 'google-sheets-api' };
  } catch (error) {
    console.error('Could not forward contact form to Google Sheets:', error);
    return { forwarded: false, provider: 'google-sheets-api', error: error.message };
  }
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message, phone, company, subject } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
  }

  const payload = {
    name,
    email,
    company: company || '',
    phone: phone || '',
    subject: subject || '',
    message,
    submittedAt: new Date().toISOString(),
  };

  const sheetResult = await forwardToGoogleSheet(payload);

  if (!sheetResult.forwarded) {
    return res.status(502).json({
      success: false,
      message: 'Your message was not recorded in Google Sheets. Please try again.',
      details: sheetResult,
    });
  }

  return res.json({
    success: true,
    message: 'Message received successfully',
    data: payload,
    sheet: sheetResult,
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

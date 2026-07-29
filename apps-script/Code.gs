const SPREADSHEET_ID = "1ehwibYJeRhUo4x19TQUGhrwPFf6WCrNECpgq7eV9Gw8";
const TIMEZONE = "Asia/Kolkata";

function doGet(e) {
  return createJsonResponse({
    ok: true,
    message: "Contact form endpoint is ready.",
  });
}

function doPost(e) {
  try {
    const payload = parsePayload(e);

    if (
      !payload.name ||
      !payload.email ||
      !payload.subject ||
      !payload.message
    ) {
      return createJsonResponse({
        ok: false,
        message: "Name, email, subject, and message are required.",
      });
    }

    if (!isValidEmail(payload.email)) {
      return createJsonResponse({
        ok: false,
        message: "Please enter a valid email address.",
      });
    }

    if (payload.message.length < 10) {
      return createJsonResponse({
        ok: false,
        message: "Message must be at least 10 characters long.",
      });
    }

    if (payload.honeypot) {
      return createJsonResponse({
        ok: false,
        message: "Spam detected.",
      });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (IST)",
        "Name",
        "Email",
        "Phone",
        "Subject",
        "Message",
        "Company",
      ]);
    }

    // Indian Standard Time
    const timestamp = Utilities.formatDate(
      new Date(),
      TIMEZONE,
      "dd-MM-yyyy HH:mm:ss",
    );

    const row = [
      timestamp,
      payload.name,
      payload.email,
      payload.phone,
      payload.subject,
      payload.message,
      payload.company,
    ];

    Logger.log("Appending row to sheet: " + sheet.getName());

    sheet.appendRow(row);
    SpreadsheetApp.flush();

    return createJsonResponse({
      ok: true,
      message: "Thanks! Your message has been received.",
      rowCount: sheet.getLastRow(),
    });
  } catch (error) {
    Logger.log("Error: " + error.toString());

    return createJsonResponse({
      ok: false,
      message: error.message || "Unable to submit your message.",
    });
  }
}

function parsePayload(e) {
  let data = {};

  if (e && e.postData && e.postData.contents) {
    const contentType = e.postData.type || "";

    if (contentType.includes("application/json")) {
      data = JSON.parse(e.postData.contents);
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      data = e.parameter || {};
    }
  }

  if (!data || typeof data !== "object") {
    data = {};
  }

  return {
    name: String(data.name || "").trim(),
    email: String(data.email || "").trim(),
    phone: String(data.phone || "").trim(),
    subject: String(data.subject || "").trim(),
    message: String(data.message || "").trim(),
    company: String(data.company || "").trim(),
    honeypot: String(data.honeypot || "").trim(),
  };
}

function createJsonResponse(payload) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

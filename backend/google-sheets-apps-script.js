// Google Apps Script for a Google Sheet
// 1. Open Google Sheets and create a sheet named Responses.
// 2. Go to Extensions > Apps Script.
// 3. Paste this code and click Deploy > New deployment.
// 4. Choose Web app, set Execute as me, Who has access: Anyone, and deploy.
// 5. Copy the web app URL into the backend environment variable GOOGLE_SHEETS_WEBHOOK_URL.

function doPost(e) {
  try {
    const data = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Responses');

    if (!sheet) {
      throw new Error('Sheet named Responses not found');
    }

    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.company || '',
      data.phone || '',
      data.subject || '',
      data.message || '',
      data.submittedAt || new Date().toISOString(),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

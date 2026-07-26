const SPREADSHEET_ID = "1HxwRkOqc2irMIKXzmX4w6AtGYlrL44iG3abwQE4pKz8";

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

    if (payload.message.trim().length < 10) {
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

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Subject",
        "Message",
        "Company",
      ]);
    }

    const row = [
      new Date().toISOString(),
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
      message: "Error: " + (error.message || "Unable to submit your message."),
    });
  }
}

function parsePayload(e) {
  let data = {};

  if (e && e.postData && e.postData.contents) {
    const contentType = e.postData.type || "";

    if (contentType.indexOf("application/json") !== -1) {
      data = JSON.parse(e.postData.contents);
    } else if (
      contentType.indexOf("application/x-www-form-urlencoded") !== -1
    ) {
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

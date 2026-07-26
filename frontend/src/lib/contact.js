export async function submitContactForm(payload) {
  const url = process.env.REACT_APP_APPS_SCRIPT_URL?.trim();

  if (!url) {
    throw new Error("Contact form endpoint is not configured.");
  }

  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    body.append(key, value);
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: body.toString(),
    keepalive: true,
    mode: "no-cors",
  });

  if (response.type === "opaque" || response.ok) {
    return {
      ok: true,
      message: "Thanks! Your message has been received.",
    };
  }

  let data = {};
  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

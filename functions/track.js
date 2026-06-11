export async function onRequestPost(context) {

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const req = context.request;
  const body = await req.json().catch(() => ({}));

  const ip =
    req.headers.get("CF-Connecting-IP") || "unknown";

  const country =
    req.cf?.country ||
    req.headers.get("CF-IPCountry") ||
    "Unknown";

  const ua = req.headers.get("User-Agent") || "";

  const device = ua.includes("Android")
    ? "Android"
    : ua.includes("iPhone")
    ? "iPhone"
    : "Desktop";

  const text = `
📖 NEW VISITOR

IP: ${ip}
Country: ${country}
Device: ${device}

Event: ${body.event || "unknown"}
Progress: ${body.progress || 0}%
  `;

  await fetch(
    "https://api.telegram.org/bot8677546393:AAFA4_DqGX01cwZ8rygu22vkxkV4QZCvBRE/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "5990407613",
        text
      })
    }
  );

  return new Response("ok");
}
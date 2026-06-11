export async function onRequestPost(context) {
  try {
    const { request } = context;

    const body = await request.json().catch(() => ({}));

    const ip =
      request.headers.get("CF-Connecting-IP") || "unknown";

    const country =
      request.headers.get("CF-IPCountry") || "Unknown";

    const ua = request.headers.get("User-Agent") || "";

    const device = ua.includes("Android")
      ? "Android"
      : ua.includes("iPhone")
      ? "iPhone"
      : "Desktop";

    const text =
`📖 NEW VISITOR

IP: ${ip}
Country: ${country}
Device: ${device}

Event: ${body.event || "unknown"}
Duration: ${body.duration || 0}s;
Progress: ${body.progress || 0}%`;

    await fetch("https://api.telegram.org/bot8677546393:AAFA4_DqGX01cwZ8rygu22vkxkV4QZCvBRE/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "5990407613",
        text
      })
    });

    return new Response("ok");

  } catch (err) {
    return new Response("error: " + err.message, { status: 500 });
  }
}
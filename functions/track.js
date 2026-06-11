export async function onRequestPost(context) {
  const { request } = context;

  let body = {};
  try {
    body = await request.json();
  } catch (e) {}

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const country = request.headers.get("CF-IPCountry") || "VN";
  const ua = request.headers.get("User-Agent") || "";

  const device = ua.includes("Android")
    ? "Android"
    : ua.includes("iPhone")
    ? "iPhone"
    : "Desktop";

  let label = "📖 NEW VISITOR";

  if (body.event === "opened") label = "📖 OPENED";
  if (body.event === "finish") label = "🏁 FINISH (READ DONE)";
  if (body.event === "abandon") label = "⚠️ ABANDONED (READING STOPPED)";

  const text = `${label}

IP: ${ip}
Country: ${country}
Device: ${device}

Event: ${body.event || "unknown"}
Duration: ${body.duration || 0}s
Progress: ${body.progress || 0}%`;

  await fetch(
    "https://api.telegram.org/botTOKEN/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "CHAT_ID",
        text
      })
    }
  );

  return new Response("ok");
}
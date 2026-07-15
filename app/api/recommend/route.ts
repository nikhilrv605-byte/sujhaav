import { NextRequest } from "next/server";

// ── Image fetcher (unchanged from your original) ──────────────────────────
async function fetchProductImage(productName: string): Promise<string> {
  try {
    const query = `${productName} official tech product photo white background`;
    const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&first=1`;
    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36",
      },
    });
    const html = await res.text();
    const htmlMatches = html.match(/&quot;murl&quot;:&quot;(https?:\/\/[^&]+)&quot;/);
    if (htmlMatches?.[1]) return decodeURIComponent(htmlMatches[1]);
    const jsonMatches = html.match(/"murl"\s*:\s*"(https?:\/\/[^"]+)"/);
    if (jsonMatches?.[1]) return decodeURIComponent(jsonMatches[1]);
  } catch (e) {
    console.error(`Error fetching image for ${productName}:`, e);
  }
  return "/hero_abstract_tech.png";
}

// ── Types ─────────────────────────────────────────────────────────────────
interface RecommendationItem {
  name: string;
  price: string;
  rating: number;
  why: string;
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  image?: string;
}

// ── Main handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { category, usage, budget, preferences } = await req.json();

  const prompt = `You are a tech product recommendation expert for Indian consumers.
Recommend exactly 3 products based on this request:
- Category: ${category}
- Primary use: ${usage}
- Budget range: ${budget}
- Additional preferences: ${preferences || "none"}

For each product, recommend the exact model name (e.g. "iQOO Neo 10", "MacBook Air M3", "Sony WH-1000XM5").
Provide detailed technical specifications tailored to the device category, alongside ratings, pros, and cons.
Respond ONLY with valid JSON in this exact format, no markdown, no backticks, no extra text:
{
  "recommendations": [
    {
      "name": "Product Model Name",
      "price": "₹XX,XXX",
      "rating": 9.2,
      "why": "2-3 sentence explanation of why this fits their needs.",
      "specs": {
        "Display": "Display specs or audio driver info",
        "Processor": "Processor model or driver chipset specs",
        "Camera": "Camera specs or microphone sensor info",
        "Battery": "Battery specs and charging rate",
        "Memory": "RAM / Storage details or build connectivity specs"
      },
      "pros": ["Pro point 1", "Pro point 2", "Pro point 3"],
      "cons": ["Con point 1", "Con point 2"]
    }
  ]
}`;

  // ── Step 1: Call Gemini ──────────────────────────────────────────────
  let geminiText = "";
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const geminiData = await geminiRes.json();
    geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (err) {
    console.error("Gemini error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to get AI recommendations" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Step 2: Parse Gemini JSON ────────────────────────────────────────
  let parsed: { recommendations: RecommendationItem[] };
  try {
    const cleaned = geminiText.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parse error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to parse recommendations" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Step 3: Stream each product one-by-one with image ───────────────
  // We use a ReadableStream so the frontend receives each product
  // as soon as its image is fetched — no waiting for all 3.
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const items = parsed.recommendations ?? [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Fetch image for THIS product (parallel with next iteration via stream)
        const imageUrl = await fetchProductImage(item.name);
        const enriched: RecommendationItem = { ...item, image: imageUrl };

        // Send as a newline-delimited JSON chunk
        const chunk = JSON.stringify({ index: i, product: enriched }) + "\n";
        controller.enqueue(encoder.encode(chunk));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no", // disables Nginx buffering on Vercel
    },
  });
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { category, usage, budget, preferences } = await req.json();

    const prompt = `You are a tech product recommendation expert for Indian consumers.

Recommend exactly 3 products based on this request:
- Category: ${category}
- Primary use: ${usage}
- Budget range: ${budget}
- Additional preferences: ${preferences || "none"}

Respond ONLY with valid JSON in this exact format, no markdown, no backticks, no extra text:
{
  "recommendations": [
    {
      "name": "Product Name",
      "price": "₹XX,XXX",
      "why": "2-3 sentence explanation of why this fits their needs"
    }
  ]
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

 const data = await response.json();
const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
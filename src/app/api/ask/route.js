// src/app/api/ai-interaction/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { question, content } = await request.json();

  if (!question.trim()) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 });
  }

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `Here is an article: \"${content}\". Now, answer this question: \"${question}\" ` }] },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error('Error fetching from Gemini API');
    }

    const data = await res.json();
    return NextResponse.json({
      content: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.",
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Sorry, I couldn't process the request." }, { status: 500 });
  }
}

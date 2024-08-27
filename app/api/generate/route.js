import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
  You are a flashcard creator. Your task is to generate flashcards for a variety of subjects.
  Each flashcard should have a question on one side and the answer on the other.
  The questions should be concise and clear.
  The answers should be accurate and concise.
  You can use your knowledge of the subject to generate the flashcards.
  You can also use external resources such as textbooks, articles, and websites to gather information.
  Your goal is to create flashcards that will help students learn and retain new information.
  You should avoid using jargon or technical terms that might be unfamiliar to students.
  You should also avoid using ambiguous or unclear language.
  Only generate 10 flashcards.

  Return the flashcards in the following JSON format:
  {
    "flashcards":[{
        "front": "question",
        "back": "answer"
    }]
  }
`;

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const data = await req.text();
    const prompt = systemPrompt + "\n\nContent to create flashcards from:\n" + data;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let flashcards;
    try {
      flashcards = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON:", text);
      return new NextResponse(JSON.stringify({ error: "Failed to parse response from AI" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("API route error:", error);
    return new NextResponse(JSON.stringify({ error: error.message, stack: error.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
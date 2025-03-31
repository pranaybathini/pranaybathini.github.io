// src/app/components/AIInteraction.js
"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

interface AIInteractionProps {
  content: string;
}

export default function AIInteraction({ content }: AIInteractionProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Flag to ensure client-side rendering

  // Ensure we only run the content rendering logic on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          question,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setResponse(data.error);
      } else {
        setResponse(data.content || "No response generated.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setResponse("Sorry, I couldn't process the request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion);
    handleSubmit();
  };

  // Only render the AI response after the client has hydrated
  if (!isClient) {
    return null; // Return null to avoid rendering anything during SSR
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
          Need clarification?
        </h2>
        <p className="text-gray-700 mb-6">
          Ask AI assistant about anything in this article and get instant answers.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full" onClick={() => handleQuickQuestion("Can you summarize this article?")}>Can you summarize this article?</button>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full" onClick={() => handleQuickQuestion("What are the key takeaways?")}>What are the key takeaways?</button>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full" onClick={() => handleQuickQuestion("Explain the article in layman terms")}>Explain the article in layman terms</button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question about this article..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black" />
          <button type="submit" disabled={isLoading} className="bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50">
            {isLoading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {(response || isLoading) && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
            <div>{isLoading ? "Thinking..." : <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{response}</ReactMarkdown>}</div>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        AI responses may not always be accurate. Verify critical information.
      </p>
    </section>
  );
}

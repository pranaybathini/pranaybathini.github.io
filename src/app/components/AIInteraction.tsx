"use client";

import { useState } from "react";

export default function AIInteraction() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Mock API call - replace with actual API call in your implementation
    setTimeout(() => {
      setResponse(`This is a mock response to: "${question}". In a real implementation, this would call an AI API to generate a response based on the article content.`);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion);
    handleSubmit();
  };

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Need clarification?
          </h2>
        </div>
        
        <p className="text-gray-700 mb-6">
          Ask AI assistant about anything in this article and get instant answers.
        </p>
        
        <div className="space-y-4">
          {/* Example questions */}
          <div className="flex flex-wrap gap-3">
            <button
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors"
              onClick={() => handleQuickQuestion("Can you summarize this article?")}
            >
              Can you summarize this article?
            </button>
            <button
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors"
              onClick={() => handleQuickQuestion("What are the key takeaways?")}
            >
              What are the key takeaways?
            </button>
            <button
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition-colors"
              onClick={() => handleQuickQuestion("Explain the technical terms")}
            >
              Explain the technical terms
            </button>
          </div>
          
          {/* Chat interface */}
          <div className="mt-6 space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="bg-gray-200 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about this article..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>...</span>
                ) : (
                  <>
                    <span>Ask</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
            
            {/* Response area */}
            {(response || isLoading) && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="bg-black text-white p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                      </svg>
                    </div>
                  </div>
                  <div className="prose prose-sm text-gray-700">
                    {isLoading ? (
                      <p>Thinking...</p>
                    ) : (
                      <p>{response}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        AI responses may not always be accurate. Verify critical information.
      </p>
    </section>
  );
}
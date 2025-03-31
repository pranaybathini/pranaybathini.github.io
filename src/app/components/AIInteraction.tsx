// src/app/components/AIInteraction.tsx
"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { Sparkles, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import type { Components } from "react-markdown";

interface AIInteractionProps {
  content: string;
}

export default function AIInteraction({ content }: AIInteractionProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

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
        body: JSON.stringify({ content, question }),
      });

      const data = await res.json();
      setResponse(data.error || data.content || "No response generated.");
    } catch (error) {
      console.error("API Error:", error);
      setResponse("Sorry, I couldn't process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion);
    handleSubmit();
  };

  // Properly typed Markdown components
  const MarkdownComponents: Components = {
    pre: ({ children, ...props }) => (
      <div className="not-prose my-6 overflow-hidden rounded-lg">
        <pre {...props} className="bg-gray-800 p-4 overflow-x-auto">
          {children}
        </pre>
      </div>
    ),
    code: (props) => {
      const { inline, className, children, ...rest } = props as {
        inline?: boolean;
        className?: string;
        children: React.ReactNode;
      };
      
      const match = /language-(\w+)/.exec(className || "");
      return inline ? (
        <code
          className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 text-sm"
          {...rest}
        >
          {children}
        </code>
      ) : (
        <code
          className={`hljs language-${match ? match[1] : ""} text-sm`}
          {...rest}
        >
          {children}
        </code>
      );
    },
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-serif font-bold mt-12 mb-6" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-serif font-bold mt-12 mb-6" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-serif font-semibold mt-8 mb-4" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-serif font-semibold mt-6 mb-3" {...props}>
        {children}
      </h4>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700"
        {...props}
      >
        {children}
      </blockquote>
    ),
    p: ({ children, ...props }) => (
      <p className="text-gray-700 leading-relaxed mb-6 text-lg" {...props}>
        {children}
      </p>
    ),
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="text-blue-600 hover:underline"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }) => (
      <figure className="my-16 mb-24">
        <div className="relative w-full aspect-video">
          <Image
            src={src || ""}
            alt={alt || ""}
            fill
            className="rounded-lg object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            {...props as Omit<React.ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'width' | 'height'>}
          />
        </div>
        {alt && (
          <figcaption className="text-center text-sm text-gray-600 mt-4">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="list-disc pl-6 space-y-2 mb-6 text-gray-700 text-lg"
        {...props}
      >
        {children}
      </ul>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-8" {...props}>
        <table className="min-w-full border-collapse">{children}</table>
      </div>
    ),
  };

  if (!isClient) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Article Assistant
          </h2>
        </div>
        
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Ask questions about this article and get instant AI-powered answers.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {[
            "Summarize this article",
            "Key takeaways?",
            "Explain in simple terms",
            "Author's main point?"
          ].map((q) => (
            <button
              key={q}
              onClick={() => handleQuickQuestion(q)}
              className="text-sm bg-white hover:bg-gray-50 px-4 py-2 rounded-full border border-gray-200 transition-all"
              disabled={isLoading}
            >
              {q}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about this article..."
            className="w-full px-5 py-3 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-14"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>

        {(response || isLoading) && (
          <div className="prose prose-lg mx-auto max-w-none
            prose-headings:font-serif prose-headings:text-gray-900 
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
            prose-strong:font-semibold prose-strong:text-gray-900
            prose-code:text-red-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
            prose-img:rounded-lg prose-img:mx-auto
            prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
            prose-table:border-collapse prose-table:w-full
            prose-th:border prose-th:border-gray-300 prose-th:p-3 prose-th:bg-gray-100
            prose-td:border prose-td:border-gray-300 prose-td:p-3">
            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating response...</span>
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={MarkdownComponents}
              >
                {response}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
          AI-generated content may contain inaccuracies. Verify critical information.
      </p>
    </section>
  );
}
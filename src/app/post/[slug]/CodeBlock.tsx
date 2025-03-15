'use client';

import { useState } from 'react';

type CodeBlockProps = {
  language: string;
  children: string;
};

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">{language}</span>
        <button
          onClick={handleCopy}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <code className={`language-${language}`}>
        {children}
      </code>
    </pre>
  );
}

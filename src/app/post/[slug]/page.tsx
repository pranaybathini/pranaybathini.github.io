import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AIInteraction  from "@/app/components/AIInteraction";
import Image from "next/image";
import CodeBlock from "@/app/components/CodeBlock";

const postsDirectory = path.join(process.cwd(), "posts");

export async function generateStaticParams() {
  const files = await fs.readdir(postsDirectory);
  return files.map((file) => ({ slug: file.replace(".md", "") }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

type CodeProps = {
  inline?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;

  if (!resolvedParams?.slug) return notFound();

  const filePath = path.join(postsDirectory, `${resolvedParams.slug}.md`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Format date to "Month Day, Year" format
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    return (
      <React.Fragment>
        <Navbar />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className=" flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold mt-12 mb-6">
                {data.title}
              </h1>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            {/* Tags on the left */}
            <div className="flex space-x-2">
              {data.tags.map((tag: string, index: number) => (
                <div
                  key={index}
                  className="border border-black rounded px-2 py-1 text-sm text-gray-700"
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Date on the right */}
            <p className="text-gray-500 text-sm">{formattedDate}</p>
          </div>
          <article className="prose prose-lg mx-auto prose-headings:font-serif prose-headings:text-gray-900 
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
            prose-strong:font-semibold prose-strong:text-gray-900
            prose-code:text-red-600 prose-code:bg-gray-100 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4
            prose-img:rounded-lg prose-img:mx-auto
            prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
            prose-table:border-collapse prose-table:w-full
            prose-th:border prose-th:border-gray-300 prose-th:p-3 prose-th:bg-gray-100
            prose-td:border prose-td:border-gray-300 prose-td:p-3">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code: (
                  { inline, children, className, ...props }: CodeProps,
                ) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";

                  return !inline
                    ? (
                      <CodeBlock language={language}>
                        {children as string}
                      </CodeBlock>
                    )
                    : (
                      <code
                        className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                },
                h1: ({ children }) => (
                  <h1 className="text-4xl font-serif font-bold mt-12 mb-6">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-serif font-bold mt-12 mb-6">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-serif font-semibold mt-8 mb-4">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-serif font-semibold mt-6 mb-3">
                    {children}
                  </h4>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700">
                    {children}
                  </blockquote>
                ),
                p: ({ children, node }) => {
                  // If paragraph contains only an image, render the figure instead
                  if (
                    node?.children[0]?.type === "element" &&
                    node.children[0].tagName === "img" &&
                    node.children.length === 1
                  ) {
                    const imgNode = node.children[0];
                    return (
                      <figure className="my-16 mb-24">
                        <div className="relative w-full aspect-video">
                          <Image
                            src={String(imgNode.properties?.src || "")}
                            alt={String(imgNode.properties?.alt || "")}
                            fill
                            className="rounded-lg object-contain"
                            priority
                          />
                        </div>
                        {imgNode.properties?.alt && (
                          <figcaption className="text-center text-sm text-gray-600 mt-4">
                            {String(imgNode.properties.alt)}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  // Regular paragraph
                  return (
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {children}
                    </p>
                  );
                },
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-600 hover:underline">
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <figure className="my-16 mb-24">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={src || ""}
                        alt={alt || ""}
                        fill
                        className="rounded-lg object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                      />
                    </div>
                    {alt && (
                      <figcaption className="text-center text-sm text-gray-600 mt-4">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 text-lg">
                    {children}
                  </ul>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse">
                      {children}
                    </table>
                  </div>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
          <AIInteraction content={content}/>
        </main>
        <Footer />
      </React.Fragment>
    );
  } catch (error) {
    console.error("Error loading markdown file:", error);
    return notFound();
  }
}

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default async function RulesPage() {
  const markdownPath = path.join(process.cwd(), 'src', 'content', 'rules', 'league-rules.md')
  const markdown = await readFile(markdownPath, 'utf-8')

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <article className="max-w-none">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-heading mt-0 mb-4 text-4xl font-bold text-white sm:text-5xl">{children}</h1>
                ),
                h2: ({ children }) => <h2 className="text-2xl font-semibold text-white mt-8 mb-3">{children}</h2>,
                p: ({ children }) => <p className="text-white/80 leading-relaxed mb-4">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 text-white/80 space-y-2 mb-4">{children}</ul>,
                li: ({ children }) => <li>{children}</li>,
                strong: ({ children }) => <strong className="text-white">{children}</strong>,
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto">
                    <table className="min-w-full border-collapse border border-white/20 text-white/85">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-white/10">{children}</thead>,
                th: ({ children }) => (
                  <th className="border border-white/20 px-4 py-2 text-left font-semibold text-white">{children}</th>
                ),
                td: ({ children }) => <td className="border border-white/20 px-4 py-2">{children}</td>,
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Card, PageShell, ui } from '@/components/ui'

export default async function RulesPage() {
  const markdownPath = path.join(process.cwd(), 'src', 'content', 'rules', 'league-rules.md')
  const markdown = await readFile(markdownPath, 'utf-8')

  return (
    <PageShell width="narrow">
        <article>
          <Card padding="lg">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className={`${ui.pageTitle} mb-4`}>{children}</h1>
                ),
                h2: ({ children }) => <h2 className={`${ui.sectionTitle} mt-8 mb-3`}>{children}</h2>,
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
          </Card>
        </article>
    </PageShell>
  )
}

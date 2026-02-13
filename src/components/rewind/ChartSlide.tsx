'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import type { ChartSlide as ChartSlideType } from '@/data/rewind-types'

const BAR_COLORS = ['#f59e0b', '#a78bfa', '#34d399', '#60a5fa', '#f87171']

type Props = {
  slide: ChartSlideType
  accent: string
}

export function ChartSlide({ slide, accent }: Props) {
  const { chart, title, subtitle, highlight, footer } = slide
  const maxY = Math.max(
    ...chart.series.flatMap((s) => s.data.map((d) => d.y)),
    1
  )

  return (
    <motion.div
      className="flex min-h-full flex-col px-4 py-8"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-white/60">
          {title}
        </p>
        {subtitle && (
          <p className="mt-1 text-base text-white/70">{subtitle}</p>
        )}
      </div>

      <div className="mt-6 h-64 w-full min-h-[200px]">
        {chart.kind === 'bar' && (() => {
          const hasMultipleSeries = chart.series.length > 1 && chart.series.every((s) => s.data.length <= 1)
          const barData = hasMultipleSeries
            ? (() => {
                const byX: Record<string, Record<string, number>> = {}
                chart.series.forEach((s) => {
                  s.data.forEach((d) => {
                    if (!byX[d.x]) byX[d.x] = { x: d.x }
                    ;(byX[d.x] as Record<string, number>)[s.name] = d.y
                  })
                })
                return Object.values(byX).map((row) => {
                  const r = { ...row }
                  chart.series.forEach((s) => {
                    if (r[s.name] === undefined) r[s.name] = 0
                  })
                  return r
                })
              })()
            : chart.series[0]?.data ?? []
          return (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="x"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  domain={[0, maxY * 1.1]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15,23,42,0.95)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                />
                {chart.series.map((series, idx) => (
                  <Bar
                    key={series.name}
                    dataKey={hasMultipleSeries ? series.name : 'y'}
                    name={series.name}
                    fill={series.color ?? BAR_COLORS[idx % BAR_COLORS.length]}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )
        })()}
        {chart.kind === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={
                chart.series[0]?.data.map((d, i) => ({
                  ...d,
                  index: i,
                })) ?? []
              }
              margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="x"
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                domain={[0, maxY * 1.1]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              {chart.series.map((series, idx) => (
                <Line
                  key={series.name}
                  type="monotone"
                  dataKey="y"
                  name={series.name}
                  stroke={BAR_COLORS[idx % BAR_COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: BAR_COLORS[idx % BAR_COLORS.length], r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
        {(chart.kind === 'stackedBar' || chart.kind === 'radar') && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chart.series[0]?.data ?? []}
              margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="x"
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                domain={[0, maxY * 1.1]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              {chart.series.map((series, idx) => (
                <Bar
                  key={series.name}
                  dataKey="y"
                  name={series.name}
                  stackId={chart.kind === 'stackedBar' ? 'stack' : undefined}
                  fill={BAR_COLORS[idx % BAR_COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {highlight && (
        <div
          className="mt-4 rounded-xl border px-4 py-2 text-center"
          style={{ borderColor: accent }}
        >
          <span className="text-sm text-white/70">{highlight.label}: </span>
          <span className="font-semibold" style={{ color: accent }}>
            {highlight.value}
          </span>
        </div>
      )}

      {footer && (
        <p className="mt-auto pt-6 text-center text-xs uppercase tracking-widest text-white/40">
          {footer}
        </p>
      )}
    </motion.div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, Calendar } from 'lucide-react'
import { getTeamsForSeason, searchTeams, findBestMatch, getTeamById } from '@/data/teams'
import type { TeamIndexEntry } from '@/data/rewind-types'
import { SEASONS, getActiveSeason, type Season } from '@/data/seasons'

export default function LandingPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<TeamIndexEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<Season>(getActiveSeason() ?? SEASONS[0])
  const [seasonOpen, setSeasonOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const seasonRef = useRef<HTMLDivElement>(null)

  const teamsForSeason = getTeamsForSeason(selectedSeason.id)

  useEffect(() => {
    const results = searchTeams(selectedSeason.id, query)
    setSuggestions(results)
    setError(null)
  }, [selectedSeason.id, query])

  // When user has already selected a team (exact match), show full list so they can change selection
  const hasExactMatch = Boolean(
    query.trim() &&
      teamsForSeason.some(
        (t) => t.displayName.toLowerCase().trim() === query.trim().toLowerCase()
      )
  )
  const dropdownList = open && hasExactMatch ? [...teamsForSeason].sort((a, b) => a.id.localeCompare(b.id)) : suggestions

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
      if (seasonRef.current && !seasonRef.current.contains(e.target as Node)) {
        setSeasonOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      setError('Enter a team name')
      return
    }
    const match = findBestMatch(selectedSeason.id, trimmed)
    if (match) {
      router.push(`/rewind/${selectedSeason.id}/${match.id}`)
      return
    }
    setError('No team found. Try one of the suggestions below.')
    setOpen(true)
    setSuggestions(searchTeams(selectedSeason.id, trimmed))
  }

  const handleSelect = (id: string) => {
    setOpen(false)
    setQuery(getTeamById(selectedSeason.id, id)?.displayName ?? id)
    setError(null)
    // Navigation happens only on "View my Rewind" (form submit)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, #3b82f6, transparent), radial-gradient(ellipse 60% 40% at 80% 100%, #8b5cf6, transparent)',
        }}
      />
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Fantasy Rewind
          </h1>
          <p className="mt-4 text-center text-lg text-white/70">
            Your season. Your story.
          </p>

          {/* Season Selector */}
          <div className="mt-6 flex justify-center">
            <div className="relative" ref={seasonRef}>
              <button
                type="button"
                onClick={() => setSeasonOpen(!seasonOpen)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm hover:bg-white/10"
              >
                <Calendar className="h-4 w-4" />
                {selectedSeason.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${seasonOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {seasonOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-white/20 bg-slate-900/95 py-2 shadow-xl backdrop-blur-md"
                  >
                    {SEASONS.map((season) => (
                      <li key={season.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSeason(season)
                            setSeasonOpen(false)
                          }}
                          className={`w-full px-4 py-2 text-left text-sm ${
                            selectedSeason.id === season.id
                              ? 'bg-white/10 text-white font-medium'
                              : 'text-white/70 hover:bg-white/5'
                          }`}
                        >
                          {season.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="relative" ref={containerRef}>
              <label htmlFor="team-input" className="sr-only">
                Select your team
              </label>
              <div className="flex rounded-2xl border-2 border-white/20 bg-white/5 shadow-xl backdrop-blur-sm focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30">
                <span className="flex items-center pl-5 text-white/50">
                  <Search className="h-5 w-5" />
                </span>
                <input
                  id="team-input"
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setOpen(true)
                  }}
                  onFocus={() => setOpen(true)}
                  placeholder="Search or type your team name..."
                  className="w-full bg-transparent py-4 pl-3 pr-12 text-lg text-white placeholder-white/40 outline-none"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="flex items-center pr-4 text-white/50 hover:text-white"
                  aria-expanded={open}
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <AnimatePresence>
                {open && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-auto rounded-2xl border border-white/20 bg-slate-900/95 py-2 shadow-xl backdrop-blur-md"
                  >
                    {dropdownList.length === 0 ? (
                      <li className="px-5 py-3 text-center text-white/50">
                        No teams match &ldquo;{query}&rdquo;
                      </li>
                    ) : (
                      dropdownList.map((team) => (
                        <li key={team.id}>
                          <button
                            type="button"
                            onClick={() => handleSelect(team.id)}
                            className="w-full px-5 py-3 text-left text-white hover:bg-white/10"
                          >
                            {team.displayName}
                          </button>
                        </li>
                      ))
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-center text-sm text-amber-400"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-amber-500 py-4 text-lg font-bold text-slate-950 shadow-lg transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              View my Rewind
            </button>
          </form>

          <p className="mt-10 text-center">
            <Link
              href="/league"
              className="text-white/60 underline decoration-white/40 underline-offset-2 hover:text-white/90 hover:decoration-white/70"
            >
              View League Recap
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Team rewind data – Novigrad 21ers 
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'novigrad-21ers',
  displayName: 'Novigrad 21ers ',
  owner: 'Hector Sanchez',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    accent: '#a78bfa',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'Novigrad 21ers ',
      footer: 'Fantasy Rewind',
      image: '/team-logos/novigrad-21ers-logo.png'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '11-7-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#3'
      }
    },
    {
      type: 'rank',
      title: 'Season Standings',
      subtitle: 'Final league table',
      metricLabel: 'W-L',
      rows: [
        {
          id: 'beijing-ducks',
          name: '北京首钢霹雳鸭',
          value: '13-5',
          rank: 1
        },
        {
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '12-6',
          rank: 2
        },
        {
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '11-7',
          rank: 3
        },
        {
          id: 'fiestas-fantastic-team',
          name: 'Fiesta\'s Fantastic Team',
          value: '11-7',
          rank: 4
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
          value: '11-7',
          rank: 5
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
          value: '9-9',
          rank: 6
        },
        {
          id: 'glizzy-goblers',
          name: 'Glizzy Goblers',
          value: '9-9',
          rank: 7
        },
        {
          id: 'metefierros',
          name: 'METEFIERROS',
          value: '7-11',
          rank: 8
        },
        {
          id: 'huecox-y-un-dobel',
          name: 'huecox y un Dobel',
          value: '5-13',
          rank: 9
        },
        {
          id: 'lalocomotora',
          name: 'LaloComotora',
          value: '2-16',
          rank: 10
        }
      ],
      highlightTeamId: 'novigrad-21ers',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '5W / 4L',
      label: 'Win / Loss',
      description: 'Maximum consecutive',
      footer: 'Momentum swings'
    },
    {
      type: 'rank',
      title: 'Win Streaks',
      subtitle: 'Longest win streak per team',
      metricLabel: 'Wins',
      rows: [
        {
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '10',
          rank: 1
        },
        {
          id: 'beijing-ducks',
          name: '北京首钢霹雳鸭',
          value: '8',
          rank: 2
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
          value: '7',
          rank: 3
        },
        {
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '5',
          rank: 4
        },
        {
          id: 'fiestas-fantastic-team',
          name: 'Fiesta\'s Fantastic Team',
          value: '4',
          rank: 5
        },
        {
          id: 'huecox-y-un-dobel',
          name: 'huecox y un Dobel',
          value: '3',
          rank: 6
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
          value: '2',
          rank: 7
        },
        {
          id: 'metefierros',
          name: 'METEFIERROS',
          value: '2',
          rank: 8
        },
        {
          id: 'glizzy-goblers',
          name: 'Glizzy Goblers',
          value: '2',
          rank: 9
        },
        {
          id: 'lalocomotora',
          name: 'LaloComotora',
          value: '1',
          rank: 10
        }
      ],
      highlightTeamId: 'novigrad-21ers',
      footer: 'Unstoppable goes to #1'
    },
    {
      type: 'rank',
      title: 'Lose Streaks',
      subtitle: 'Longest losing streak per team',
      metricLabel: 'Losses',
      rows: [
        {
          id: 'lalocomotora',
          name: 'LaloComotora',
          value: '8',
          rank: 1
        },
        {
          id: 'huecox-y-un-dobel',
          name: 'huecox y un Dobel',
          value: '6',
          rank: 2
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
          value: '5',
          rank: 3
        },
        {
          id: 'metefierros',
          name: 'METEFIERROS',
          value: '5',
          rank: 4
        },
        {
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '4',
          rank: 5
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
          value: '3',
          rank: 6
        },
        {
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '3',
          rank: 7
        },
        {
          id: 'beijing-ducks',
          name: '北京首钢霹雳鸭',
          value: '3',
          rank: 8
        },
        {
          id: 'fiestas-fantastic-team',
          name: 'Fiesta\'s Fantastic Team',
          value: '2',
          rank: 9
        },
        {
          id: 'glizzy-goblers',
          name: 'Glizzy Goblers',
          value: '2',
          rank: 10
        }
      ],
      highlightTeamId: 'novigrad-21ers',
      footer: 'Free Fall goes to #1'
    },
    {
      type: 'chart',
      title: 'Points For vs Points Against',
      subtitle: 'Season totals',
      chart: {
        kind: 'bar',
        xLabel: 'Category',
        yLabel: 'Points',
        series: [
          {
            name: 'Points For',
            data: [
              {
                x: 'Points For',
                y: 25042.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 23164.0
              }
            ],
            color: '#ef4444'
          }
        ]
      },
      footer: 'Your offensive vs defensive performance'
    },
    {
      type: 'stat',
      title: 'Consistency',
      value: '#1',
      label: 'I am consistent',
      description: 'Std dev: 166.8',
      footer: 'Lower is more consistent'
    },
    {
      type: 'chart',
      title: 'League Consistency',
      subtitle: 'Standard deviation (lower = more consistent)',
      chart: {
        kind: 'bar',
        xLabel: 'Team',
        yLabel: 'Std Dev',
        series: [
          {
            name: 'Consistency',
            data: [
              {
                x: 'Novigrad 21ers ',
                y: 166.79413643955618
              },
              {
                x: 'METEFIERROS',
                y: 187.1515280312839
              },
              {
                x: 'Tochetaos',
                y: 191.99560340902357
              },
              {
                x: 'LaloComotora',
                y: 194.1222807318707
              },
              {
                x: 'huecox y un Dobel',
                y: 200.9992091993534
              },
              {
                x: 'LububuMatcha',
                y: 202.84127620712047
              },
              {
                x: 'Fiesta\'s Fantastic T',
                y: 232.46621950269795
              },
              {
                x: '北京首钢霹雳鸭',
                y: 236.10225473586232
              },
              {
                x: 'Glizzy Goblers',
                y: 239.68150162710143
              },
              {
                x: 'Diego\'s Daring Team',
                y: 245.83531072651056
              }
            ]
          }
        ]
      },
      highlight: {
        label: 'Novigrad 21ers ',
        value: '#1'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 4,
      result: 'W',
      me: {
        name: 'Novigrad 21ers ',
        score: 1651
      },
      opp: {
        name: 'LububuMatcha',
        score: 1489
      },
      margin: 162,
      note: 'vs LububuMatcha',
      footer: 'Worst week: 943 (Week 8)'
    },
    {
      type: 'rank',
      title: 'Highest Scoring Week (per team)',
      subtitle: 'Ceiling Check goes to #1',
      metricLabel: 'Points',
      rows: [
        {
          id: 'beijing-ducks',
          name: '北京首钢霹雳鸭',
          value: '1817',
          rank: 1
        },
        {
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '1804',
          rank: 2
        },
        {
          id: 'fiestas-fantastic-team',
          name: 'Fiesta\'s Fantastic Team',
          value: '1761',
          rank: 3
        },
        {
          id: 'glizzy-goblers',
          name: 'Glizzy Goblers',
          value: '1694',
          rank: 4
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
          value: '1672',
          rank: 5
        },
        {
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '1651',
          rank: 6
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
          value: '1601',
          rank: 7
        },
        {
          id: 'metefierros',
          name: 'METEFIERROS',
          value: '1542',
          rank: 8
        },
        {
          id: 'huecox-y-un-dobel',
          name: 'huecox y un Dobel',
          value: '1509',
          rank: 9
        },
        {
          id: 'lalocomotora',
          name: 'LaloComotora',
          value: '1474',
          rank: 10
        }
      ],
      highlightTeamId: 'novigrad-21ers',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '2-4',
      label: 'Record in games ≤100 pts',
      description: '6 total close games',
      footer: 'Margin ≤100 points'
    },
    {
      type: 'timeline',
      title: 'Close Games',
      subtitle: 'Every close game (≤100 pts margin)',
      events: [
        {
          label: 'Week 3',
          title: 'vs METEFIERROS',
          detail: '1294–1322 (28 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 8',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '943–883 (60 pts)',
          kind: 'win'
        },
        {
          label: 'Week 10',
          title: 'vs Tochetaos',
          detail: '1333–1425 (92 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'vs METEFIERROS',
          detail: '1418–1481 (63 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 16',
          title: 'vs Glizzy Goblers',
          detail: '1338–1282 (56 pts)',
          kind: 'win'
        },
        {
          label: 'Week 18',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1284–1363 (79 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'award',
      title: 'The Choke',
      badgeName: 'Most Close Losses',
      description: 'Lost 4 close games (≤100 pts margin)',
      footer: 'So close...',
      awardTier: 'no-award',
      image: '/badges/the-choke.png'
    },
    {
      type: 'timeline',
      title: 'Close Losses',
      subtitle: 'The Choke moments',
      events: [
        {
          label: 'Week 3',
          title: 'Lost to METEFIERROS',
          detail: '1294–1322 (28 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 10',
          title: 'Lost to Tochetaos',
          detail: '1333–1425 (92 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'Lost to METEFIERROS',
          detail: '1418–1481 (63 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 18',
          title: 'Lost to 北京首钢霹雳鸭',
          detail: '1284–1363 (79 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Heartbreak'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 3,
      result: 'L',
      me: {
        name: 'Novigrad 21ers ',
        score: 1294
      },
      opp: {
        name: 'METEFIERROS',
        score: 1322
      },
      margin: 28,
      note: '28.0-point heartbreak',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'Glizzy Goblers',
      label: '2 games',
      description: '5671 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'Glizzy Goblers',
      events: [
        {
          label: 'Week 7',
          title: 'vs Glizzy Goblers',
          detail: '1650–1401 (W)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs Glizzy Goblers',
          detail: '1338–1282 (W)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 11,
      result: 'L',
      me: {
        name: 'Novigrad 21ers ',
        score: 1339
      },
      opp: {
        name: 'Diego\'s Daring Team',
        score: 1672
      },
      margin: 333,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Cooper Flagg',
        'Josh Hart',
        'Austin Reaves',
        'Alperen Sengun',
        'Christian Braun'
      ],
      lost: [
        'Domantas Sabonis',
        'Franz Wagner',
        'Deni Avdija',
        'Payton Pritchard',
        'Deandre Ayton',
        'Daniel Gafford',
        'Kelly Oubre Jr.',
        'Egor Demin'
      ],
      added: [
        'Stephon Castle',
        'Naz Reid',
        'Bam Adebayo',
        'Isaiah Hartenstein',
        'Darius Garland',
        'Immanuel Quickley',
        'Jalen Green',
        'John Collins',
        'Oso Ighodaro'
      ],
      footer: 'You kept 5/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Alperen Sengun',
          secondary: '2608 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Bam Adebayo',
          secondary: '2403 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Immanuel Quickley',
          secondary: '2392 fantasy points',
          meta: '#3'
        }
      ],
      footer: 'Your fantasy stars'
    },
    {
      type: 'list',
      title: 'Category Dominance',
      subtitle: 'Top 3 rankings in 9CAT',
      items: [
        {
          primary: 'PTS',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: 'REB',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: 'AST',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: 'STL',
          secondary: 'Rank #2',
          meta: '#2'
        }
      ],
      footer: 'Your strongest categories'
    },
    {
      type: 'award',
      title: 'Your Archetype',
      badgeName: 'The Swiss Army Knife',
      description: 'Top 3 en 4 categorías. Versatilidad.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'list',
      title: 'Category Titles',
      subtitle: 'First place honors',
      items: [
        {
          primary: 'The Scoring King',
          secondary: '#1 en PTS',
          image: '/badges/the-scoring-king-badge.png'
        },
        {
          primary: 'The Worm',
          secondary: '#1 en REB',
          image: '/badges/the-worm-badge.png'
        },
        {
          primary: 'The Point God',
          secondary: '#1 en AST',
          image: '/badges/the-poing-god-badge.png'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'playoffOutcome',
      title: 'In the playoff bracket',
      description: 'You finished the regular season #3 and made the top 6. Playoff results will show here when the bracket is complete.',
      outcome: 'made_playoffs',
      standing: 3,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'Novigrad 21ers ',
      record: {
        value: '11-7-0',
        standing: '#3'
      },
      archetype: {
        name: 'The Swiss Army Knife'
      },
      titles: [
        {
          name: 'The Choke',
          label: 'Most close losses',
          image: '/badges/the-choke.png'
        },
        {
          name: 'The Scoring King',
          label: '#1 en PTS',
          image: '/badges/the-scoring-king-badge.png'
        },
        {
          name: 'The Worm',
          label: '#1 en REB',
          image: '/badges/the-worm-badge.png'
        },
        {
          name: 'The Point God',
          label: '#1 en AST',
          image: '/badges/the-poing-god-badge.png'
        }
      ],
      summaryInsights: {
        rival: {
          stat: '2 games · 5671 pts combined',
          opponentTeamId: 'glizzy-goblers'
        },
        nemesis: {
          stat: 'Week 11 · L 1339–1672 (−333 pts)',
          opponentTeamId: 'diegos-daring-team'
        },
        closestGame: {
          stat: 'Week 3 · 1294–1322 (L, 28-pt margin)',
          opponentTeamId: 'metefierros'
        },
        highestScoringWeek: {
          stat: 'Week 4 · 1651 pts',
          opponentTeamId: 'lububumatcha'
        }
      },
      footer: 'Fantasy Rewind'
    },
    {
      type: 'debtTable',
      title: 'Tabla de Deuda 2025-2026',
      subtitle: 'Compensación económica por equipo',
      rows: [
        {
          teamId: 'glizzy-goblers',
          teamName: 'Glizzy Goblers',
          amount: '$100 MXN'
        },
        {
          teamId: 'lalocomotora',
          teamName: 'Lalocomotora',
          amount: '$550 MXN'
        },
        {
          teamId: 'diegos-daring-team',
          teamName: 'Diego\'s Daring Team',
          amount: '$100 MXN'
        },
        {
          teamId: 'huecox-y-un-dobel',
          teamName: 'Huecox y un dobel',
          amount: '$200 MXN'
        },
        {
          teamId: 'metefierros',
          teamName: 'Metefierros',
          amount: '$200 MXN'
        },
        {
          teamId: 'lububumatcha',
          teamName: 'LububuMatcha',
          amount: '$200 MXN'
        },
        {
          teamId: 'beijing-ducks',
          teamName: 'Beijing Ducks',
          amount: '$100 MXN'
        },
        {
          teamId: 'tochetaos',
          teamName: 'Tochetaos',
          amount: '$100 MXN'
        },
        {
          teamId: 'fiestas-fantastic-team',
          teamName: 'Fiesta\'s Fantastic Team',
          amount: '$100 MXN'
        }
      ],
      total: '$1,650 MXN',
      footer: 'Cena de la liga: el campeón no paga; el sobrante reduce costos para los demás miembros.',
      highlightTeamId: 'novigrad-21ers'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Novigrad 21ers ',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 1,
        valueDisplay: '14104'
      },
      {
        category: 'REB',
        rank: 1,
        valueDisplay: '4966'
      },
      {
        category: 'AST',
        rank: 1,
        valueDisplay: '3603'
      },
      {
        category: 'STL',
        rank: 2,
        valueDisplay: '828'
      },
      {
        category: 'BLK',
        rank: 6,
        valueDisplay: '472'
      },
      {
        category: '3PM',
        rank: 4,
        valueDisplay: '1358'
      },
      {
        category: 'FG%',
        rank: 4,
        valueDisplay: '47.9%'
      },
      {
        category: 'FT%',
        rank: 9,
        valueDisplay: '77.5%'
      },
      {
        category: 'TO',
        rank: 10,
        valueDisplay: '1744'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Alperen Sengun',
        points: 2608
      },
      {
        name: 'Bam Adebayo',
        points: 2403
      },
      {
        name: 'Immanuel Quickley',
        points: 2392
      },
      {
        name: 'Cooper Flagg',
        points: 2269
      },
      {
        name: 'Naz Reid',
        points: 2059
      },
      {
        name: 'Stephon Castle',
        points: 2025
      },
      {
        name: 'Austin Reaves',
        points: 1838
      },
      {
        name: 'Josh Hart',
        points: 1828
      },
      {
        name: 'John Collins',
        points: 1573
      },
      {
        name: 'Oso Ighodaro',
        points: 1413
      },
      {
        name: 'Darius Garland',
        points: 1208
      },
      {
        name: 'Isaiah Hartenstein',
        points: 1198
      },
      {
        name: 'Christian Braun',
        points: 868
      },
      {
        name: 'Jalen Green',
        points: 578
      }
    ]
  }
}

export default data

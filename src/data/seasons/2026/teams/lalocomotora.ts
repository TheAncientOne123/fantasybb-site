/**
 * Team rewind data – LaloComotora
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'lalocomotora',
  displayName: 'LaloComotora',
  owner: 'Mau',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    accent: '#f59e0b',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'LaloComotora',
      footer: 'Fantasy Rewind',
      image: 'https://g.espncdn.com/lm-static/fba/images/default_logos/5.svg'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '2-16-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#10'
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
      highlightTeamId: 'lalocomotora',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '1W / 8L',
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
      highlightTeamId: 'lalocomotora',
      footer: 'Unstoppable goes to #1'
    },
    {
      type: 'award',
      title: 'Free Fall',
      badgeName: 'Longest losing streak in the league',
      description: 'Longest losing streak: 8 consecutive losses.',
      footer: 'Rough patch',
      awardTier: 'standoff',
      image: '/badges/free-fall.png'
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
                y: 19681.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 24265.0
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
      value: '#4',
      label: 'Mostly Reliable',
      description: 'Std dev: 194.1',
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
        label: 'LaloComotora',
        value: '#4'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 11,
      result: 'W',
      me: {
        name: 'LaloComotora',
        score: 1474
      },
      opp: {
        name: 'LububuMatcha',
        score: 1456
      },
      margin: 18,
      note: 'vs LububuMatcha',
      footer: 'Worst week: 774 (Week 18)'
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
      highlightTeamId: 'lalocomotora',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '1-3',
      label: 'Record in games ≤100 pts',
      description: '4 total close games',
      footer: 'Margin ≤100 points'
    },
    {
      type: 'timeline',
      title: 'Close Games',
      subtitle: 'Every close game (≤100 pts margin)',
      events: [
        {
          label: 'Week 10',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1420–1445 (25 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 11',
          title: 'vs LububuMatcha',
          detail: '1474–1456 (18 pts)',
          kind: 'win'
        },
        {
          label: 'Week 13',
          title: 'vs huecox y un Dobel',
          detail: '1151–1200 (49 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 19',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1254–1297 (43 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 11,
      result: 'W',
      me: {
        name: 'LaloComotora',
        score: 1474
      },
      opp: {
        name: 'LububuMatcha',
        score: 1456
      },
      margin: 18,
      note: '18.0-point thriller',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: '北京首钢霹雳鸭',
      label: '2 games',
      description: '5521 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: '北京首钢霹雳鸭',
      events: [
        {
          label: 'Week 3',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1002–1608 (L)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1268–1643 (L)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 3,
      result: 'L',
      me: {
        name: 'LaloComotora',
        score: 1002
      },
      opp: {
        name: '北京首钢霹雳鸭',
        score: 1608
      },
      margin: 606,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Trae Young',
        'Paolo Banchero'
      ],
      lost: [
        'Pascal Siakam',
        'Joel Embiid',
        'Desmond Bane',
        'Dyson Daniels',
        'Trey Murphy III',
        'Kawhi Leonard',
        'Mark Williams',
        'Malik Monk',
        'Bennedict Mathurin',
        'Devin Vassell',
        'Jonas Valanciunas'
      ],
      added: [
        'Ajay Mitchell',
        'Kon Knueppel',
        'Nic Claxton',
        'Tre Jones',
        'Jaime Jaquez Jr.',
        'OG Anunoby',
        'Zion Williamson',
        'Neemias Queta',
        'Jerami Grant',
        'Quentin Grimes',
        'P.J. Washington',
        'Toumani Camara'
      ],
      footer: 'You kept 2/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Kon Knueppel',
          secondary: '2372 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Paolo Banchero',
          secondary: '2292 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Zion Williamson',
          secondary: '1995 fantasy points',
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
          primary: 'FG%',
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'TO',
          secondary: 'Rank #1',
          meta: '#1'
        }
      ],
      footer: 'Your strongest categories'
    },
    {
      type: 'award',
      title: 'Your Archetype',
      badgeName: 'Away From Keyboard',
      description: 'Actividad (trades + adds + drops) en percentil bajo. Roster estable.',
      footer: 'Season identity',
      awardTier: 'standoff'
    },
    {
      type: 'list',
      title: 'Category Titles',
      subtitle: 'First place honors',
      items: [
        {
          primary: 'The Caretaker',
          secondary: '#1 en TO (menos turnovers)',
          image: '/badges/the-caretaker-badge.png'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'playoffOutcome',
      title: 'Eliminated from playoff contention',
      description: 'You didn\'t make the top 6 and missed the playoffs (regular season #10).',
      outcome: 'eliminated',
      standing: 10,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'LaloComotora',
      record: {
        value: '2-16-0',
        standing: '#10'
      },
      archetype: {
        name: 'Away From Keyboard'
      },
      titles: [
        {
          name: 'Free Fall',
          label: 'Longest losing streak',
          image: '/badges/free-fall.png'
        },
        {
          name: 'The Caretaker',
          label: '#1 en TO (menos turnovers)',
          image: '/badges/the-caretaker-badge.png'
        }
      ],
      summaryInsights: {
        rival: {
          stat: '2 games · 5521 pts combined',
          opponentTeamId: 'beijing-ducks'
        },
        nemesis: {
          stat: 'Week 3 · L 1002–1608 (−606 pts)',
          opponentTeamId: 'beijing-ducks'
        },
        closestGame: {
          stat: 'Week 11 · 1474–1456 (W, 18-pt margin)',
          opponentTeamId: 'lububumatcha'
        },
        highestScoringWeek: {
          stat: 'Week 11 · 1474 pts',
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
      highlightTeamId: 'lalocomotora'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'LaloComotora',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 10,
        valueDisplay: '11348'
      },
      {
        category: 'REB',
        rank: 8,
        valueDisplay: '3750'
      },
      {
        category: 'AST',
        rank: 10,
        valueDisplay: '2412'
      },
      {
        category: 'STL',
        rank: 9,
        valueDisplay: '674'
      },
      {
        category: 'BLK',
        rank: 10,
        valueDisplay: '362'
      },
      {
        category: '3PM',
        rank: 9,
        valueDisplay: '1057'
      },
      {
        category: 'FG%',
        rank: 3,
        valueDisplay: '48.6%'
      },
      {
        category: 'FT%',
        rank: 6,
        valueDisplay: '79.2%'
      },
      {
        category: 'TO',
        rank: 1,
        valueDisplay: '1239'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Kon Knueppel',
        points: 2372
      },
      {
        name: 'Paolo Banchero',
        points: 2292
      },
      {
        name: 'Zion Williamson',
        points: 1995
      },
      {
        name: 'Nic Claxton',
        points: 1951
      },
      {
        name: 'OG Anunoby',
        points: 1905
      },
      {
        name: 'Jaime Jaquez Jr.',
        points: 1894
      },
      {
        name: 'Neemias Queta',
        points: 1894
      },
      {
        name: 'Toumani Camara',
        points: 1816
      },
      {
        name: 'Quentin Grimes',
        points: 1680
      },
      {
        name: 'Tre Jones',
        points: 1612
      },
      {
        name: 'Jerami Grant',
        points: 1533
      },
      {
        name: 'P.J. Washington',
        points: 1511
      },
      {
        name: 'Ajay Mitchell',
        points: 1414
      },
      {
        name: 'Trae Young',
        points: 516
      }
    ]
  }
}

export default data

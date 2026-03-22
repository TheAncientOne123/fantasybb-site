/**
 * Team rewind data – METEFIERROS
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'metefierros',
  displayName: 'METEFIERROS',
  owner: 'Angel Lozano',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
    accent: '#60a5fa',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'METEFIERROS',
      footer: 'Fantasy Rewind',
      image: 'https://g.espncdn.com/lm-static/logo-packs/core/SimpleShields/shields-4.svg'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '7-11-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#8'
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
      highlightTeamId: 'metefierros',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '2W / 5L',
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
      highlightTeamId: 'metefierros',
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
      highlightTeamId: 'metefierros',
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
                y: 21753.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 22860.0
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
      value: '#2',
      label: 'Rock Solid',
      description: 'Std dev: 187.2',
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
        label: 'METEFIERROS',
        value: '#2'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 15,
      result: 'W',
      me: {
        name: 'METEFIERROS',
        score: 1542
      },
      opp: {
        name: '北京首钢霹雳鸭',
        score: 1387
      },
      margin: 155,
      note: 'vs 北京首钢霹雳鸭',
      footer: 'Worst week: 725 (Week 8)'
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
      highlightTeamId: 'metefierros',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '3-4',
      label: 'Record in games ≤100 pts',
      description: '7 total close games',
      footer: 'Margin ≤100 points'
    },
    {
      type: 'timeline',
      title: 'Close Games',
      subtitle: 'Every close game (≤100 pts margin)',
      events: [
        {
          label: 'Week 3',
          title: 'vs Novigrad 21ers ',
          detail: '1322–1294 (28 pts)',
          kind: 'win'
        },
        {
          label: 'Week 4',
          title: 'vs Glizzy Goblers',
          detail: '1231–1329 (98 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 6',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1135–1193 (58 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 8',
          title: 'vs Diego\'s Daring Team',
          detail: '725–786 (61 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 11',
          title: 'vs huecox y un Dobel',
          detail: '1227–1268 (41 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'vs Novigrad 21ers ',
          detail: '1481–1418 (63 pts)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs Tochetaos',
          detail: '1129–1043 (86 pts)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 3,
      result: 'W',
      me: {
        name: 'METEFIERROS',
        score: 1322
      },
      opp: {
        name: 'Novigrad 21ers ',
        score: 1294
      },
      margin: 28,
      note: '28.0-point thriller',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'Novigrad 21ers ',
      label: '2 games',
      description: '5515 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'Novigrad 21ers ',
      events: [
        {
          label: 'Week 3',
          title: 'vs Novigrad 21ers ',
          detail: '1322–1294 (W)',
          kind: 'win'
        },
        {
          label: 'Week 12',
          title: 'vs Novigrad 21ers ',
          detail: '1481–1418 (W)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 19,
      result: 'L',
      me: {
        name: 'METEFIERROS',
        score: 885
      },
      opp: {
        name: 'LububuMatcha',
        score: 1374
      },
      margin: 489,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Victor Wembanyama',
        'Tyrese Maxey',
        'DeMar DeRozan'
      ],
      lost: [
        'Josh Giddey',
        'Miles Bridges',
        'Myles Turner',
        'Jakob Poeltl',
        'CJ McCollum',
        'Anfernee Simons',
        'Paul George',
        'Ace Bailey',
        'Kyle Kuzma',
        'Cameron Johnson'
      ],
      added: [
        'Andrew Nembhard',
        'Kyshawn George',
        'Joel Embiid',
        'Anthony Black',
        'Derik Queen',
        'Deandre Ayton',
        'Ty Jerome',
        'Anthony Davis',
        'Pascal Siakam',
        'Jalen Slawson',
        'Keyonte George'
      ],
      footer: 'You kept 3/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Tyrese Maxey',
          secondary: '3287 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Victor Wembanyama',
          secondary: '2981 fantasy points',
          meta: '#2'
        },
        {
          primary: 'DeMar DeRozan',
          secondary: '2272 fantasy points',
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
          primary: 'BLK',
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'FT%',
          secondary: 'Rank #2',
          meta: '#2'
        },
        {
          primary: 'TO',
          secondary: 'Rank #3',
          meta: '#3'
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
          primary: 'The Cold Blooded',
          secondary: '#1 en FT%',
          image: '/badges/the-coldblooded-badge.png'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'playoffOutcome',
      title: 'Eliminated from playoff contention',
      description: 'You didn\'t make the top 6 and missed the playoffs (regular season #8).',
      outcome: 'eliminated',
      standing: 8,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'METEFIERROS',
      record: {
        value: '7-11-0',
        standing: '#8'
      },
      archetype: {
        name: 'Away From Keyboard'
      },
      titles: [
        {
          name: 'The Cold Blooded',
          label: '#1 en FT%',
          image: '/badges/the-coldblooded-badge.png'
        }
      ],
      summaryInsights: {
        rival: 'Novigrad 21ers  · 2 games · 5515 pts combined',
        nemesis: 'LububuMatcha · Week 19 · L 885–1374 (−489 pts)',
        closestGame: 'Week 3 vs Novigrad 21ers  · 1322–1294 (W, 28-pt margin)',
        highestScoringWeek: 'Week 15 · 1542 pts vs 北京首钢霹雳鸭'
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
      highlightTeamId: 'metefierros'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'METEFIERROS',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 8,
        valueDisplay: '11702'
      },
      {
        category: 'REB',
        rank: 9,
        valueDisplay: '3720'
      },
      {
        category: 'AST',
        rank: 9,
        valueDisplay: '2616'
      },
      {
        category: 'STL',
        rank: 10,
        valueDisplay: '661'
      },
      {
        category: 'BLK',
        rank: 3,
        valueDisplay: '525'
      },
      {
        category: '3PM',
        rank: 7,
        valueDisplay: '1214'
      },
      {
        category: 'FG%',
        rank: 10,
        valueDisplay: '46.7%'
      },
      {
        category: 'FT%',
        rank: 2,
        valueDisplay: '82.2%'
      },
      {
        category: 'TO',
        rank: 3,
        valueDisplay: '1266'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Tyrese Maxey',
        points: 3287
      },
      {
        name: 'Victor Wembanyama',
        points: 2981
      },
      {
        name: 'DeMar DeRozan',
        points: 2272
      },
      {
        name: 'Pascal Siakam',
        points: 2187
      },
      {
        name: 'Keyonte George',
        points: 2110
      },
      {
        name: 'Derik Queen',
        points: 1982
      },
      {
        name: 'Anthony Black',
        points: 1830
      },
      {
        name: 'Andrew Nembhard',
        points: 1775
      },
      {
        name: 'Deandre Ayton',
        points: 1737
      },
      {
        name: 'Kyshawn George',
        points: 1499
      },
      {
        name: 'Joel Embiid',
        points: 1411
      },
      {
        name: 'Anthony Davis',
        points: 870
      },
      {
        name: 'Ty Jerome',
        points: 523
      },
      {
        name: 'Jalen Slawson',
        points: 142
      }
    ]
  }
}

export default data

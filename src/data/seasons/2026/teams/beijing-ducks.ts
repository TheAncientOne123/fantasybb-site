/**
 * Team rewind data – 北京首钢霹雳鸭
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'beijing-ducks',
  displayName: '北京首钢霹雳鸭',
  owner: 'Ulises Montiel',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #78350f 100%)',
    accent: '#fbbf24',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: '北京首钢霹雳鸭',
      footer: 'Fantasy Rewind',
      image: '/team-logos/beijing-ducks-logo.png'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '13-5-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#1'
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
      highlightTeamId: 'beijing-ducks',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '8W / 3L',
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
      highlightTeamId: 'beijing-ducks',
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
      highlightTeamId: 'beijing-ducks',
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
                y: 26263.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 23629.0
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
      value: '#8',
      label: 'Boom or bust',
      description: 'Std dev: 236.1',
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
        label: '北京首钢霹雳鸭',
        value: '#8'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 17,
      result: 'W',
      me: {
        name: '北京首钢霹雳鸭',
        score: 1817
      },
      opp: {
        name: 'huecox y un Dobel',
        score: 1509
      },
      margin: 308,
      note: 'vs huecox y un Dobel',
      footer: 'Worst week: 743 (Week 8)'
    },
    {
      type: 'award',
      title: 'Ceiling Check',
      badgeName: 'Highest scoring week in the league',
      description: 'You had the single highest scoring week with 1817 points.',
      footer: 'Peak performance',
      image: '/badges/ceiling-check.png'
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
      highlightTeamId: 'beijing-ducks',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '4-3',
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
          label: 'Week 2',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1507–1513 (6 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 6',
          title: 'vs METEFIERROS',
          detail: '1193–1135 (58 pts)',
          kind: 'win'
        },
        {
          label: 'Week 11',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1504–1510 (6 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 14',
          title: 'vs Diego\'s Daring Team',
          detail: '1415–1436 (21 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 16',
          title: 'vs LububuMatcha',
          detail: '1431–1378 (53 pts)',
          kind: 'win'
        },
        {
          label: 'Week 18',
          title: 'vs Novigrad 21ers ',
          detail: '1363–1284 (79 pts)',
          kind: 'win'
        },
        {
          label: 'Week 19',
          title: 'vs Glizzy Goblers',
          detail: '1464–1365 (99 pts)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 2,
      result: 'L',
      me: {
        name: '北京首钢霹雳鸭',
        score: 1507
      },
      opp: {
        name: 'Fiesta\'s Fantastic Team',
        score: 1513
      },
      margin: 6,
      note: '6.0-point heartbreak',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'LububuMatcha',
      label: '2 games',
      description: '6083 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'LububuMatcha',
      events: [
        {
          label: 'Week 7',
          title: 'vs LububuMatcha',
          detail: '1697–1577 (W)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs LububuMatcha',
          detail: '1431–1378 (W)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 15,
      result: 'L',
      me: {
        name: '北京首钢霹雳鸭',
        score: 1387
      },
      opp: {
        name: 'METEFIERROS',
        score: 1542
      },
      margin: 155,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'award',
      title: 'Public Enemy No. 1',
      badgeName: 'Most #1 Rivals',
      description: '3 teams had you as their main rival — LububuMatcha, Fiesta\'s Fantastic Team, LaloComotora',
      footer: 'Everyone had you on their radar',
      image: '/badges/public-enemy-no1.png'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Nikola Jokic',
        'Jalen Brunson',
        'Kevin Durant',
        'Jalen Johnson',
        'Derrick White',
        'RJ Barrett',
        'Tyler Herro'
      ],
      lost: [
        'Kristaps Porzingis',
        'Reed Sheppard',
        'Ausar Thompson',
        'Kyrie Irving',
        'Jabari Smith Jr.',
        'Luguentz Dort'
      ],
      added: [
        'Trey Murphy III',
        'Brandon Miller',
        'Andrew Wiggins',
        'Franz Wagner',
        'Jalen Williams',
        'Gui Santos',
        'Daniss Jenkins'
      ],
      footer: 'You kept 7/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Nikola Jokic',
          secondary: '3641 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Jalen Johnson',
          secondary: '3135 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Kevin Durant',
          secondary: '2874 fantasy points',
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
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'AST',
          secondary: 'Rank #2',
          meta: '#2'
        },
        {
          primary: '3PM',
          secondary: 'Rank #2',
          meta: '#2'
        },
        {
          primary: 'FT%',
          secondary: 'Rank #1',
          meta: '#1'
        }
      ],
      footer: 'Your strongest categories'
    },
    {
      type: 'award',
      title: 'Your Archetype',
      badgeName: 'Live by the Three',
      description: 'Dominancia en 3PM y PTS. Vive del triple.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'award',
      title: 'Manager Of The Year',
      badgeName: 'MOTY ',
      description: '25% Stats, 15% Standings before playoffs, 25% League champion, 35% MVA (Roster efficiency + Transaction impact).',
      footer: '25% Stats, 15% Standings, 25% Champion, 35% MVA',
      image: '/badges/manager-of-the-year.png',
      motyBreakdown: {
        stats: 16.7,
        standings: 15.0,
        champion: 25.0,
        mva: 23.3
      }
    },
    {
      type: 'playoffOutcome',
      title: 'In the playoff bracket',
      description: 'You finished the regular season #1 and made the top 6. Playoff results will show here when the bracket is complete.',
      outcome: 'made_playoffs',
      standing: 1,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: '北京首钢霹雳鸭',
      record: {
        value: '13-5-0',
        standing: '#1'
      },
      archetype: {
        name: 'Live by the Three'
      },
      titles: [
        {
          name: 'Ceiling Check',
          label: 'Highest scoring week',
          image: '/badges/ceiling-check.png'
        },
        {
          name: 'Public Enemy No. 1',
          label: 'Most #1 rivals',
          image: '/badges/public-enemy-no1.png'
        },
        {
          name: 'Manager Of The Year',
          label: 'MOTY',
          image: '/badges/manager-of-the-year.png'
        }
      ],
      summaryInsights: {
        rival: {
          stat: '2 games · 6083 pts combined',
          opponentTeamId: 'lububumatcha'
        },
        nemesis: {
          stat: 'Week 15 · L 1387–1542 (−155 pts)',
          opponentTeamId: 'metefierros'
        },
        closestGame: {
          stat: 'Week 2 · 1507–1513 (L, 6-pt margin)',
          opponentTeamId: 'fiestas-fantastic-team'
        },
        highestScoringWeek: {
          stat: 'Week 17 · 1817 pts',
          opponentTeamId: 'huecox-y-un-dobel'
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
      highlightTeamId: 'beijing-ducks'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: '北京首钢霹雳鸭',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 3,
        valueDisplay: '13825'
      },
      {
        category: 'REB',
        rank: 7,
        valueDisplay: '3890'
      },
      {
        category: 'AST',
        rank: 2,
        valueDisplay: '3285'
      },
      {
        category: 'STL',
        rank: 8,
        valueDisplay: '698'
      },
      {
        category: 'BLK',
        rank: 7,
        valueDisplay: '455'
      },
      {
        category: '3PM',
        rank: 2,
        valueDisplay: '1496'
      },
      {
        category: 'FG%',
        rank: 6,
        valueDisplay: '47.7%'
      },
      {
        category: 'FT%',
        rank: 1,
        valueDisplay: '83.7%'
      },
      {
        category: 'TO',
        rank: 7,
        valueDisplay: '1577'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Nikola Jokic',
        points: 3641
      },
      {
        name: 'Jalen Johnson',
        points: 3135
      },
      {
        name: 'Kevin Durant',
        points: 2874
      },
      {
        name: 'Jalen Brunson',
        points: 2734
      },
      {
        name: 'Derrick White',
        points: 2633
      },
      {
        name: 'Trey Murphy III',
        points: 2582
      },
      {
        name: 'Brandon Miller',
        points: 1873
      },
      {
        name: 'Andrew Wiggins',
        points: 1871
      },
      {
        name: 'RJ Barrett',
        points: 1449
      },
      {
        name: 'Gui Santos',
        points: 1134
      },
      {
        name: 'Daniss Jenkins',
        points: 1037
      },
      {
        name: 'Franz Wagner',
        points: 1013
      },
      {
        name: 'Jalen Williams',
        points: 915
      },
      {
        name: 'Tyler Herro',
        points: 872
      }
    ]
  }
}

export default data

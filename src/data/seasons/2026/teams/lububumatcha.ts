/**
 * Team rewind data – LububuMatcha
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'lububumatcha',
  displayName: 'LububuMatcha',
  owner: 'Juanjo Ortigoza',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)',
    accent: '#34d399',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'LububuMatcha',
      footer: 'Fantasy Rewind',
      image: '/team-logos/labubu-matcha-logo.png'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '9-9-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#6'
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
      highlightTeamId: 'lububumatcha',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '2W / 3L',
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
      highlightTeamId: 'lububumatcha',
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
      highlightTeamId: 'lububumatcha',
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
                y: 23991.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 23356.0
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
      value: '#6',
      label: 'Roller Coaster',
      description: 'Std dev: 202.8',
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
        label: 'LububuMatcha',
        value: '#6'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 17,
      result: 'W',
      me: {
        name: 'LububuMatcha',
        score: 1601
      },
      opp: {
        name: 'Tochetaos',
        score: 1536
      },
      margin: 65,
      note: 'vs Tochetaos',
      footer: 'Worst week: 762 (Week 8)'
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
      highlightTeamId: 'lububumatcha',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '3-3',
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
          label: 'Week 5',
          title: 'vs Glizzy Goblers',
          detail: '1340–1312 (28 pts)',
          kind: 'win'
        },
        {
          label: 'Week 11',
          title: 'vs LaloComotora',
          detail: '1456–1474 (18 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'vs huecox y un Dobel',
          detail: '1194–1266 (72 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 14',
          title: 'vs Glizzy Goblers',
          detail: '1257–1252 (5 pts)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1378–1431 (53 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 17',
          title: 'vs Tochetaos',
          detail: '1601–1536 (65 pts)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 14,
      result: 'W',
      me: {
        name: 'LububuMatcha',
        score: 1257
      },
      opp: {
        name: 'Glizzy Goblers',
        score: 1252
      },
      margin: 5,
      note: '5.0-point thriller',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: '北京首钢霹雳鸭',
      label: '2 games',
      description: '6083 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: '北京首钢霹雳鸭',
      events: [
        {
          label: 'Week 7',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1577–1697 (L)',
          kind: 'loss'
        },
        {
          label: 'Week 16',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1378–1431 (L)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 13,
      result: 'L',
      me: {
        name: 'LububuMatcha',
        score: 1023
      },
      opp: {
        name: 'Novigrad 21ers ',
        score: 1312
      },
      margin: 289,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 13,
      kept: [

      ],
      lost: [
        'Cade Cunningham',
        'James Harden',
        'Bam Adebayo',
        'Jaren Jackson Jr.',
        'Jimmy Butler III',
        'Coby White',
        'Immanuel Quickley',
        'Brandon Miller',
        'Alex Sarr',
        'Tari Eason',
        'Santi Aldama',
        'Bobby Portis',
        'Corey Kispert'
      ],
      added: [
        'Matas Buzelis',
        'Jrue Holiday',
        'Rudy Gobert',
        'Dyson Daniels',
        'Donovan Mitchell',
        'Deni Avdija',
        'Miles Bridges',
        'Dejounte Murray',
        'Kyle Filipowski',
        'Justin Edwards',
        'Jayson Tatum',
        'Will Riley',
        'Bub Carrington'
      ],
      footer: 'You kept 0/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Donovan Mitchell',
          secondary: '2936 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Dyson Daniels',
          secondary: '2413 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Deni Avdija',
          secondary: '2266 fantasy points',
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
          primary: 'REB',
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'AST',
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'BLK',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: '3PM',
          secondary: 'Rank #3',
          meta: '#3'
        }
      ],
      footer: 'Your strongest categories'
    },
    {
      type: 'award',
      title: 'Your Archetype',
      badgeName: 'Trade Merchant',
      description: 'Trades ≥ percentil 75 o ≥10. El que más movió el mercado.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'list',
      title: 'Category Titles',
      subtitle: 'First place honors',
      items: [
        {
          primary: 'The Rim Guardian',
          secondary: '#1 en BLK',
          image: '/badges/the-rim-guardian-badge.png'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'playoffOutcome',
      title: 'In the playoff bracket',
      description: 'You finished the regular season #6 and made the top 6. Playoff results will show here when the bracket is complete.',
      outcome: 'made_playoffs',
      standing: 6,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'LububuMatcha',
      record: {
        value: '9-9-0',
        standing: '#6'
      },
      archetype: {
        name: 'Trade Merchant'
      },
      titles: [
        {
          name: 'The Rim Guardian',
          label: '#1 en BLK',
          image: '/badges/the-rim-guardian-badge.png'
        }
      ],
      summaryInsights: {
        rival: {
          stat: '2 games · 6083 pts combined',
          opponentTeamId: 'beijing-ducks'
        },
        nemesis: {
          stat: 'Week 13 · L 1023–1312 (−289 pts)',
          opponentTeamId: 'novigrad-21ers'
        },
        closestGame: {
          stat: 'Week 14 · 1257–1252 (W, 5-pt margin)',
          opponentTeamId: 'glizzy-goblers'
        },
        highestScoringWeek: {
          stat: 'Week 17 · 1601 pts',
          opponentTeamId: 'tochetaos'
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
      highlightTeamId: 'lububumatcha'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'LububuMatcha',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 6,
        valueDisplay: '13121'
      },
      {
        category: 'REB',
        rank: 3,
        valueDisplay: '4631'
      },
      {
        category: 'AST',
        rank: 3,
        valueDisplay: '3213'
      },
      {
        category: 'STL',
        rank: 5,
        valueDisplay: '809'
      },
      {
        category: 'BLK',
        rank: 1,
        valueDisplay: '566'
      },
      {
        category: '3PM',
        rank: 3,
        valueDisplay: '1411'
      },
      {
        category: 'FG%',
        rank: 7,
        valueDisplay: '47.5%'
      },
      {
        category: 'FT%',
        rank: 7,
        valueDisplay: '79.0%'
      },
      {
        category: 'TO',
        rank: 8,
        valueDisplay: '1602'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Donovan Mitchell',
        points: 2936
      },
      {
        name: 'Dyson Daniels',
        points: 2413
      },
      {
        name: 'Deni Avdija',
        points: 2266
      },
      {
        name: 'Rudy Gobert',
        points: 2254
      },
      {
        name: 'Matas Buzelis',
        points: 2176
      },
      {
        name: 'Miles Bridges',
        points: 2051
      },
      {
        name: 'Kyle Filipowski',
        points: 1718
      },
      {
        name: 'Bub Carrington',
        points: 1523
      },
      {
        name: 'Jrue Holiday',
        points: 1421
      },
      {
        name: 'Will Riley',
        points: 925
      },
      {
        name: 'Justin Edwards',
        points: 763
      },
      {
        name: 'Dejounte Murray',
        points: 382
      },
      {
        name: 'Jayson Tatum',
        points: 235
      }
    ]
  }
}

export default data

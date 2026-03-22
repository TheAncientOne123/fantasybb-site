/**
 * Team rewind data – Diego's Daring Team
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'diegos-daring-team',
  displayName: 'Diego\'s Daring Team',
  owner: 'Diego Vargas',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #7c2d12 100%)',
    accent: '#fb923c',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'Diego\'s Daring Team',
      footer: 'Fantasy Rewind',
      image: 'https://g.espncdn.com/lm-static/fba/images/default_logos/1.svg'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '11-7-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#5'
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
      highlightTeamId: 'diegos-daring-team',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '7W / 5L',
      label: 'Win / Loss',
      description: 'Maximum consecutive',
      footer: 'Momentum swings'
    },
    {
      type: 'award',
      title: 'The Kingslayer',
      badgeName: 'Kingslayer',
      description: 'You ended Tochetaos\'s 10-game win streak in week 15.',
      footer: 'Jaime Lannister would be proud of you',
      image: '/badges/kingslayer.png'
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
      highlightTeamId: 'diegos-daring-team',
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
                y: 23088.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 22008.0
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
      value: '#10',
      label: 'Hit-or-Miss',
      description: 'Std dev: 245.8',
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
        label: 'Diego\'s Daring Team',
        value: '#10'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 11,
      result: 'W',
      me: {
        name: 'Diego\'s Daring Team',
        score: 1672
      },
      opp: {
        name: 'Novigrad 21ers ',
        score: 1339
      },
      margin: 333,
      note: 'vs Novigrad 21ers ',
      footer: 'Worst week: 786 (Week 8)'
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
      highlightTeamId: 'diegos-daring-team',
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
          label: 'Week 3',
          title: 'vs Glizzy Goblers',
          detail: '1062–1064 (2 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 6',
          title: 'vs Tochetaos',
          detail: '1356–1371 (15 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 8',
          title: 'vs METEFIERROS',
          detail: '786–725 (61 pts)',
          kind: 'win'
        },
        {
          label: 'Week 12',
          title: 'vs Glizzy Goblers',
          detail: '1437–1497 (60 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 14',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1436–1415 (21 pts)',
          kind: 'win'
        },
        {
          label: 'Week 19',
          title: 'vs huecox y un Dobel',
          detail: '1282–1264 (18 pts)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 3,
      result: 'L',
      me: {
        name: 'Diego\'s Daring Team',
        score: 1062
      },
      opp: {
        name: 'Glizzy Goblers',
        score: 1064
      },
      margin: 2,
      note: '2.0-point heartbreak',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'Tochetaos',
      label: '2 games',
      description: '5686 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'Tochetaos',
      events: [
        {
          label: 'Week 6',
          title: 'vs Tochetaos',
          detail: '1356–1371 (L)',
          kind: 'loss'
        },
        {
          label: 'Week 15',
          title: 'vs Tochetaos',
          detail: '1569–1390 (W)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 5,
      result: 'L',
      me: {
        name: 'Diego\'s Daring Team',
        score: 1026
      },
      opp: {
        name: '北京首钢霹雳鸭',
        score: 1557
      },
      margin: 531,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 12,
      kept: [
        'Jaylen Brown',
        'Julius Randle',
        'VJ Edgecombe'
      ],
      lost: [
        'Anthony Edwards',
        'Karl-Anthony Towns',
        'LaMelo Ball',
        'Jordan Poole',
        'Norman Powell',
        'Darius Garland',
        'Cam Thomas',
        'Stephon Castle',
        'Collin Sexton',
        'Zach Edey'
      ],
      added: [
        'Russell Westbrook',
        'Ausar Thompson',
        'Jaden McDaniels',
        'Payton Pritchard',
        'Jamal Murray',
        'Donte DiVincenzo',
        'Kel\'el Ware',
        'Kristaps Porzingis',
        'Cameron Johnson'
      ],
      footer: 'You kept 3/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Jamal Murray',
          secondary: '3035 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Jaylen Brown',
          secondary: '2768 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Julius Randle',
          secondary: '2698 fantasy points',
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
          primary: 'STL',
          secondary: 'Rank #1',
          meta: '#1'
        }
      ],
      footer: 'Your strongest categories'
    },
    {
      type: 'award',
      title: 'Your Archetype',
      badgeName: 'The Optimizer',
      description: 'Bueno sin ser dominante: no top 1, no bottom 3, récord y diferencial positivos pero no extremos. Maximizó resultados con recursos limitados.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'list',
      title: 'Category Titles',
      subtitle: 'First place honors',
      items: [
        {
          primary: 'The Grand Theft Alvarado',
          secondary: '#1 en STL',
          image: '/badges/grand-theft-alvarado.png'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'playoffOutcome',
      title: 'In the playoff bracket',
      description: 'You finished the regular season #5 and made the top 6. Playoff results will show here when the bracket is complete.',
      outcome: 'made_playoffs',
      standing: 5,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'Diego\'s Daring Team',
      record: {
        value: '11-7-0',
        standing: '#5'
      },
      archetype: {
        name: 'The Optimizer'
      },
      titles: [
        {
          name: 'The Kingslayer',
          label: 'Streak ender',
          image: '/badges/kingslayer.png'
        },
        {
          name: 'The Grand Theft Alvarado',
          label: '#1 en STL',
          image: '/badges/grand-theft-alvarado.png'
        }
      ],
      summaryInsights: {
        rival: {
          stat: '2 games · 5686 pts combined',
          opponentTeamId: 'tochetaos'
        },
        nemesis: {
          stat: 'Week 5 · L 1026–1557 (−531 pts)',
          opponentTeamId: 'beijing-ducks'
        },
        closestGame: {
          stat: 'Week 3 · 1062–1064 (L, 2-pt margin)',
          opponentTeamId: 'glizzy-goblers'
        },
        highestScoringWeek: {
          stat: 'Week 11 · 1672 pts',
          opponentTeamId: 'novigrad-21ers'
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
      highlightTeamId: 'diegos-daring-team'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Diego\'s Daring Team',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 5,
        valueDisplay: '13343'
      },
      {
        category: 'REB',
        rank: 6,
        valueDisplay: '4172'
      },
      {
        category: 'AST',
        rank: 4,
        valueDisplay: '3179'
      },
      {
        category: 'STL',
        rank: 1,
        valueDisplay: '835'
      },
      {
        category: 'BLK',
        rank: 8,
        valueDisplay: '372'
      },
      {
        category: '3PM',
        rank: 6,
        valueDisplay: '1270'
      },
      {
        category: 'FG%',
        rank: 9,
        valueDisplay: '47.2%'
      },
      {
        category: 'FT%',
        rank: 4,
        valueDisplay: '81.2%'
      },
      {
        category: 'TO',
        rank: 9,
        valueDisplay: '1685'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Jamal Murray',
        points: 3035
      },
      {
        name: 'Jaylen Brown',
        points: 2768
      },
      {
        name: 'Julius Randle',
        points: 2698
      },
      {
        name: 'Payton Pritchard',
        points: 2272
      },
      {
        name: 'VJ Edgecombe',
        points: 2130
      },
      {
        name: 'Donte DiVincenzo',
        points: 2110
      },
      {
        name: 'Jaden McDaniels',
        points: 2107
      },
      {
        name: 'Russell Westbrook',
        points: 2082
      },
      {
        name: 'Kel\'el Ware',
        points: 1897
      },
      {
        name: 'Ausar Thompson',
        points: 1769
      },
      {
        name: 'Cameron Johnson',
        points: 1049
      },
      {
        name: 'Kristaps Porzingis',
        points: 777
      }
    ]
  }
}

export default data

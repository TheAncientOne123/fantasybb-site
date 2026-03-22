/**
 * Team rewind data – Glizzy Goblers
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'glizzy-goblers',
  displayName: 'Glizzy Goblers',
  owner: 'Emilio Callejas',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #422006 0%, #713f12 50%, #422006 100%)',
    accent: '#facc15',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'Glizzy Goblers',
      footer: 'Fantasy Rewind',
      image: '/team-logos/glizzy-goblers-logo.jpg'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '9-9-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#7'
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
      highlightTeamId: 'glizzy-goblers',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '2W / 2L',
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
      highlightTeamId: 'glizzy-goblers',
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
      highlightTeamId: 'glizzy-goblers',
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
                y: 23490.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 23841.0
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
      value: '#9',
      label: 'Living on the edge',
      description: 'Std dev: 239.7',
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
        label: 'Glizzy Goblers',
        value: '#9'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 17,
      result: 'W',
      me: {
        name: 'Glizzy Goblers',
        score: 1694
      },
      opp: {
        name: 'LaloComotora',
        score: 1281
      },
      margin: 413,
      note: 'vs LaloComotora',
      footer: 'Worst week: 659 (Week 8)'
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
      highlightTeamId: 'glizzy-goblers',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '4-4',
      label: 'Record in games ≤100 pts',
      description: '8 total close games',
      footer: 'Margin ≤100 points'
    },
    {
      type: 'timeline',
      title: 'Close Games',
      subtitle: 'Every close game (≤100 pts margin)',
      events: [
        {
          label: 'Week 3',
          title: 'vs Diego\'s Daring Team',
          detail: '1064–1062 (2 pts)',
          kind: 'win'
        },
        {
          label: 'Week 4',
          title: 'vs METEFIERROS',
          detail: '1329–1231 (98 pts)',
          kind: 'win'
        },
        {
          label: 'Week 5',
          title: 'vs LububuMatcha',
          detail: '1312–1340 (28 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 9',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1116–1026 (90 pts)',
          kind: 'win'
        },
        {
          label: 'Week 12',
          title: 'vs Diego\'s Daring Team',
          detail: '1497–1437 (60 pts)',
          kind: 'win'
        },
        {
          label: 'Week 14',
          title: 'vs LububuMatcha',
          detail: '1252–1257 (5 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 16',
          title: 'vs Novigrad 21ers ',
          detail: '1282–1338 (56 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 19',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1365–1464 (99 pts)',
          kind: 'loss'
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
        name: 'Glizzy Goblers',
        score: 1064
      },
      opp: {
        name: 'Diego\'s Daring Team',
        score: 1062
      },
      margin: 2,
      note: '2.0-point thriller',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'Novigrad 21ers ',
      label: '2 games',
      description: '5671 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'Novigrad 21ers ',
      events: [
        {
          label: 'Week 7',
          title: 'vs Novigrad 21ers ',
          detail: '1401–1650 (L)',
          kind: 'loss'
        },
        {
          label: 'Week 16',
          title: 'vs Novigrad 21ers ',
          detail: '1282–1338 (L)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 2,
      result: 'L',
      me: {
        name: 'Glizzy Goblers',
        score: 937
      },
      opp: {
        name: 'Tochetaos',
        score: 1399
      },
      margin: 462,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Luka Doncic',
        'LeBron James',
        'Evan Mobley',
        'Michael Porter Jr.',
        'Tobias Harris'
      ],
      lost: [
        'Zion Williamson',
        'Jarrett Allen',
        'Walker Kessler',
        'Kevin Porter Jr.',
        'Naz Reid',
        'Russell Westbrook',
        'Obi Toppin',
        'Chris Paul'
      ],
      added: [
        'Nickeil Alexander-Walker',
        'Naji Marshall',
        'Donovan Clingan',
        'Saddiq Bey',
        'Reed Sheppard',
        'Coby White',
        'Cam Spencer',
        'Julian Champagnie',
        'Peyton Watson'
      ],
      footer: 'You kept 5/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Luka Doncic',
          secondary: '3499 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Nickeil Alexander-Walker',
          secondary: '2390 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Donovan Clingan',
          secondary: '2329 fantasy points',
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
          primary: '3PM',
          secondary: 'Rank #1',
          meta: '#1'
        }
      ],
      footer: 'Your strongest categories'
    },
    {
      type: 'award',
      title: 'Your Archetype',
      badgeName: 'The Role Player',
      description: 'No fuiste la estrella, pero estuviste ahí.',
      footer: 'Season identity',
      awardTier: 'no-award'
    },
    {
      type: 'list',
      title: 'Category Titles',
      subtitle: 'First place honors',
      items: [
        {
          primary: 'The Splash Father',
          secondary: '#1 en 3PM',
          image: '/badges/the-splash-father-badge.png'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'playoffOutcome',
      title: 'Eliminated from playoff contention',
      description: 'You didn\'t make the top 6 and missed the playoffs (regular season #7).',
      outcome: 'eliminated',
      standing: 7,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'Glizzy Goblers',
      record: {
        value: '9-9-0',
        standing: '#7'
      },
      archetype: {
        name: 'The Role Player'
      },
      titles: [
        {
          name: 'The Splash Father',
          label: '#1 en 3PM',
          image: '/badges/the-splash-father-badge.png'
        }
      ],
      summaryInsights: {
        rival: 'Novigrad 21ers  · 2 games · 5671 pts combined',
        nemesis: 'Tochetaos · Week 2 · L 937–1399 (−462 pts)',
        closestGame: 'Week 3 vs Diego\'s Daring Team · 1064–1062 (W, 2-pt margin)',
        highestScoringWeek: 'Week 17 · 1694 pts vs LaloComotora'
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
      highlightTeamId: 'glizzy-goblers'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Glizzy Goblers',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 5,
        valueDisplay: '13203'
      },
      {
        category: 'REB',
        rank: 4,
        valueDisplay: '4480'
      },
      {
        category: 'AST',
        rank: 6,
        valueDisplay: '2885'
      },
      {
        category: 'STL',
        rank: 6,
        valueDisplay: '797'
      },
      {
        category: 'BLK',
        rank: 4,
        valueDisplay: '515'
      },
      {
        category: '3PM',
        rank: 1,
        valueDisplay: '1563'
      },
      {
        category: 'FG%',
        rank: 8,
        valueDisplay: '47.4%'
      },
      {
        category: 'FT%',
        rank: 10,
        valueDisplay: '77.4%'
      },
      {
        category: 'TO',
        rank: 5,
        valueDisplay: '1517'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Luka Doncic',
        points: 3499
      },
      {
        name: 'Nickeil Alexander-Walker',
        points: 2390
      },
      {
        name: 'Donovan Clingan',
        points: 2329
      },
      {
        name: 'Evan Mobley',
        points: 2321
      },
      {
        name: 'LeBron James',
        points: 2106
      },
      {
        name: 'Reed Sheppard',
        points: 2052
      },
      {
        name: 'Michael Porter Jr.',
        points: 2044
      },
      {
        name: 'Saddiq Bey',
        points: 1990
      },
      {
        name: 'Naji Marshall',
        points: 1918
      },
      {
        name: 'Cam Spencer',
        points: 1805
      },
      {
        name: 'Julian Champagnie',
        points: 1716
      },
      {
        name: 'Peyton Watson',
        points: 1446
      },
      {
        name: 'Tobias Harris',
        points: 1380
      },
      {
        name: 'Coby White',
        points: 1090
      }
    ]
  }
}

export default data

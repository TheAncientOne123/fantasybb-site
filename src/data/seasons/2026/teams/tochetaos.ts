/**
 * Team rewind data – Tochetaos
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'tochetaos',
  displayName: 'Tochetaos',
  owner: 'Sebastian Aguilar',
  description: 'Objetivo: Convertirnos en Bucks FC, drafteando a pura gema oculta y desarrollandolos para llegar hasta el campeonaton\nVisión: Ser los underdogs, caminando despacio sin rushear nada\nMisión: Cogerme a Peru FC',
  theme: {
    background: 'linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #581c87 100%)',
    accent: '#c084fc',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'Tochetaos',
      footer: 'Fantasy Rewind',
      image: '/team-logos/tochetaos.png'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '12-6-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#2'
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
      highlightTeamId: 'tochetaos',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '10W / 3L',
      label: 'Win / Loss',
      description: 'Maximum consecutive',
      footer: 'Momentum swings'
    },
    {
      type: 'award',
      title: 'Unstoppable',
      badgeName: 'Longest win streak in the league',
      description: 'You had the longest win streak with 10 consecutive wins.',
      footer: 'Peak momentum',
      image: '/badges/the-unstoppable-badge.png'
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
      highlightTeamId: 'tochetaos',
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
                y: 25097.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 23069.0
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
      value: '#3',
      label: 'Steady Hands',
      description: 'Std dev: 192.0',
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
        label: 'Tochetaos',
        value: '#3'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 11,
      result: 'W',
      me: {
        name: 'Tochetaos',
        score: 1804
      },
      opp: {
        name: 'Glizzy Goblers',
        score: 1383
      },
      margin: 421,
      note: 'vs Glizzy Goblers',
      footer: 'Worst week: 892 (Week 8)'
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
      highlightTeamId: 'tochetaos',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '2-2',
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
          label: 'Week 6',
          title: 'vs Diego\'s Daring Team',
          detail: '1371–1356 (15 pts)',
          kind: 'win'
        },
        {
          label: 'Week 10',
          title: 'vs Novigrad 21ers ',
          detail: '1425–1333 (92 pts)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs METEFIERROS',
          detail: '1043–1129 (86 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 17',
          title: 'vs LububuMatcha',
          detail: '1536–1601 (65 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 6,
      result: 'W',
      me: {
        name: 'Tochetaos',
        score: 1371
      },
      opp: {
        name: 'Diego\'s Daring Team',
        score: 1356
      },
      margin: 15,
      note: '15.0-point thriller',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'Fiesta\'s Fantastic Team',
      label: '2 games',
      description: '6030 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'Fiesta\'s Fantastic Team',
      events: [
        {
          label: 'Week 3',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1437–1761 (L)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1479–1353 (W)',
          kind: 'win'
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
        name: 'Tochetaos',
        score: 1437
      },
      opp: {
        name: 'Fiesta\'s Fantastic Team',
        score: 1761
      },
      margin: 324,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Giannis Antetokounmpo',
        'Amen Thompson',
        'Stephen Curry',
        'Scottie Barnes',
        'Onyeka Okongwu',
        'Brandon Ingram',
        'Chet Holmgren'
      ],
      lost: [
        'Jalen Green',
        'Andrew Nembhard',
        'Nic Claxton',
        'Draymond Green',
        'Jalen Suggs',
        'Donovan Clingan'
      ],
      added: [
        'Ryan Rollins',
        'Kevin Porter Jr.',
        'Josh Giddey',
        'Isaiah Collier',
        'Tristan da Silva',
        'Bobby Portis',
        'Jakob Poeltl'
      ],
      footer: 'You kept 7/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Scottie Barnes',
          secondary: '2935 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Amen Thompson',
          secondary: '2682 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Ryan Rollins',
          secondary: '2475 fantasy points',
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
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'BLK',
          secondary: 'Rank #2',
          meta: '#2'
        },
        {
          primary: 'FG%',
          secondary: 'Rank #2',
          meta: '#2'
        }
      ],
      footer: 'Your strongest categories'
    },
    {
      type: 'award',
      title: 'Your Archetype',
      badgeName: 'The Lockdown',
      description: 'Dominancia en STL y BLK. Defensa total.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'playoffOutcome',
      title: 'In the playoff bracket',
      description: 'You finished the regular season #2 and made the top 6. Playoff results will show here when the bracket is complete.',
      outcome: 'made_playoffs',
      standing: 2,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'Tochetaos',
      record: {
        value: '12-6-0',
        standing: '#2'
      },
      archetype: {
        name: 'The Lockdown'
      },
      titles: [
        {
          name: 'Unstoppable',
          label: 'Longest win streak',
          image: '/badges/the-unstoppable-badge.png'
        }
      ],
      summaryInsights: {
        rival: 'Fiesta\'s Fantastic Team · 2 games · 6030 pts combined',
        nemesis: 'Fiesta\'s Fantastic Team · Week 3 · L 1437–1761 (−324 pts)',
        closestGame: 'Week 6 vs Diego\'s Daring Team · 1371–1356 (W, 15-pt margin)',
        highestScoringWeek: 'Week 11 · 1804 pts vs Glizzy Goblers'
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
      highlightTeamId: 'tochetaos'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Tochetaos',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 7,
        valueDisplay: '11841'
      },
      {
        category: 'REB',
        rank: 5,
        valueDisplay: '4470'
      },
      {
        category: 'AST',
        rank: 5,
        valueDisplay: '3046'
      },
      {
        category: 'STL',
        rank: 3,
        valueDisplay: '819'
      },
      {
        category: 'BLK',
        rank: 2,
        valueDisplay: '537'
      },
      {
        category: '3PM',
        rank: 10,
        valueDisplay: '1040'
      },
      {
        category: 'FG%',
        rank: 2,
        valueDisplay: '49.1%'
      },
      {
        category: 'FT%',
        rank: 8,
        valueDisplay: '78.6%'
      },
      {
        category: 'TO',
        rank: 6,
        valueDisplay: '1535'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Scottie Barnes',
        points: 2935
      },
      {
        name: 'Amen Thompson',
        points: 2682
      },
      {
        name: 'Ryan Rollins',
        points: 2475
      },
      {
        name: 'Brandon Ingram',
        points: 2405
      },
      {
        name: 'Onyeka Okongwu',
        points: 2336
      },
      {
        name: 'Chet Holmgren',
        points: 2298
      },
      {
        name: 'Josh Giddey',
        points: 2026
      },
      {
        name: 'Giannis Antetokounmpo',
        points: 1777
      },
      {
        name: 'Bobby Portis',
        points: 1710
      },
      {
        name: 'Stephen Curry',
        points: 1708
      },
      {
        name: 'Isaiah Collier',
        points: 1696
      },
      {
        name: 'Kevin Porter Jr.',
        points: 1598
      },
      {
        name: 'Tristan da Silva',
        points: 1314
      },
      {
        name: 'Jakob Poeltl',
        points: 950
      }
    ]
  }
}

export default data

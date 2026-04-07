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
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '11-7',
          rank: 1
        },
        {
          id: 'beijing-ducks',
          name: '北京首钢霹雳鸭',
          value: '13-5',
          rank: 2
        },
        {
          id: 'fiestas-fantastic-team',
          name: 'Fiesta\'s Fantastic Team',
          value: '11-7',
          rank: 3
        },
        {
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '12-6',
          rank: 4
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
          value: '9-9',
          rank: 5
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
          value: '11-7',
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
      currentCount: 13,
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
        'Cameron Johnson',
        'Nic Claxton'
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
          secondary: '3414 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Jaylen Brown',
          secondary: '3027 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Julius Randle',
          secondary: '2914 fantasy points',
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
      type: 'playoffOutcome',
      title: 'Lost in Round 1',
      description: 'You made the playoffs and lost in the first round',
      outcome: 'lost_round1',
      standing: 6,
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
      howFarYouWent: {
        title: 'Lost in Round 1',
        description: 'You made the playoffs and lost in the first round'
      },
      motyScoreSnapshot: {
        score: 27.0,
        statsPointsRaw: 1.0,
        stats: 0.0,
        standings: 11.7,
        mva: 15.4
      },
      titles: [
        {
          name: 'The Kingslayer',
          label: 'Streak ender',
          image: '/badges/kingslayer.png'
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
        rank: 6,
        valueDisplay: '14551'
      },
      {
        category: 'REB',
        rank: 6,
        valueDisplay: '4504'
      },
      {
        category: 'AST',
        rank: 4,
        valueDisplay: '3431'
      },
      {
        category: 'STL',
        rank: 3,
        valueDisplay: '902'
      },
      {
        category: 'BLK',
        rank: 9,
        valueDisplay: '406'
      },
      {
        category: '3PM',
        rank: 5,
        valueDisplay: '1427'
      },
      {
        category: 'FG%',
        rank: 9,
        valueDisplay: '47.3%'
      },
      {
        category: 'FT%',
        rank: 5,
        valueDisplay: '81.1%'
      },
      {
        category: 'TO',
        rank: 9,
        valueDisplay: '1813'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Jamal Murray',
        points: 3414
      },
      {
        name: 'Jaylen Brown',
        points: 3027
      },
      {
        name: 'Julius Randle',
        points: 2914
      },
      {
        name: 'Payton Pritchard',
        points: 2535
      },
      {
        name: 'VJ Edgecombe',
        points: 2397
      },
      {
        name: 'Donte DiVincenzo',
        points: 2249
      },
      {
        name: 'Jaden McDaniels',
        points: 2181
      },
      {
        name: 'Kel\'el Ware',
        points: 2109
      },
      {
        name: 'Nic Claxton',
        points: 2088
      },
      {
        name: 'Russell Westbrook',
        points: 2082
      },
      {
        name: 'Ausar Thompson',
        points: 2053
      },
      {
        name: 'Cameron Johnson',
        points: 1284
      },
      {
        name: 'Kristaps Porzingis',
        points: 953
      }
    ],
    rosterFinal: [
      {
        playerId: 3936299,
        name: 'Jamal Murray',
        fantasyPoints: 3414,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627750.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
        proTeamAbbrev: 'DEN',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3917376,
        name: 'Jaylen Brown',
        fantasyPoints: 3027,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627759.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        proTeamAbbrev: 'BOS',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 3064514,
        name: 'Julius Randle',
        fantasyPoints: 2914,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203944.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
        proTeamAbbrev: 'MIN',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 4066354,
        name: 'Payton Pritchard',
        fantasyPoints: 2535,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630202.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        proTeamAbbrev: 'BOS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 5124612,
        name: 'VJ Edgecombe',
        fantasyPoints: 2397,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642845.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3934673,
        name: 'Donte DiVincenzo',
        fantasyPoints: 2249,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628978.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
        proTeamAbbrev: 'MIN',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4431671,
        name: 'Jaden McDaniels',
        fantasyPoints: 2181,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630183.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
        proTeamAbbrev: 'MIN',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 5105623,
        name: 'Kel\'el Ware',
        fantasyPoints: 2109,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642276.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
        proTeamAbbrev: 'MIA',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 4278067,
        name: 'Nic Claxton',
        fantasyPoints: 2088,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629651.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
        proTeamAbbrev: 'BKN',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 3468,
        name: 'Russell Westbrook',
        fantasyPoints: 2082,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201566.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
        proTeamAbbrev: 'SAC',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4684742,
        name: 'Ausar Thompson',
        fantasyPoints: 2053,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641709.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg',
        proTeamAbbrev: 'DET',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 3138196,
        name: 'Cameron Johnson',
        fantasyPoints: 1284,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629661.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
        proTeamAbbrev: 'DEN',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3102531,
        name: 'Kristaps Porzingis',
        fantasyPoints: 953,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/204001.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
        proTeamAbbrev: 'GSW',
        positions: [
          'Forward-Center'
        ]
      }
    ],
    rosterDrafted: [
      {
        playerId: 4594268,
        name: 'Anthony Edwards',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630162.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
        proTeamAbbrev: 'MIN',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3136195,
        name: 'Karl-Anthony Towns',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626157.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
        proTeamAbbrev: 'NYK',
        positions: [
          'Center-Forward'
        ]
      },
      {
        playerId: 3917376,
        name: 'Jaylen Brown',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627759.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        proTeamAbbrev: 'BOS',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4432816,
        name: 'LaMelo Ball',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630163.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
        proTeamAbbrev: 'CHA',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4277956,
        name: 'Jordan Poole',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629673.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
        proTeamAbbrev: 'NOP',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3064514,
        name: 'Julius Randle',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203944.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
        proTeamAbbrev: 'MIN',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 2595516,
        name: 'Norman Powell',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626181.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
        proTeamAbbrev: 'MIA',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4396907,
        name: 'Darius Garland',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629636.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
        proTeamAbbrev: 'LAC',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4432174,
        name: 'Cam Thomas',
        positions: [
          '—'
        ],
        headshotUrl: 'https://a.espncdn.com/i/headshots/nba/players/full/4432174.png',
        proTeamAbbrev: 'FA'
      },
      {
        playerId: 4845367,
        name: 'Stephon Castle',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642264.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
        proTeamAbbrev: 'SAS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 5124612,
        name: 'VJ Edgecombe',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642845.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4277811,
        name: 'Collin Sexton',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629012.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
        proTeamAbbrev: 'CHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4600663,
        name: 'Zach Edey',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641744.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg',
        proTeamAbbrev: 'MEM',
        positions: [
          'Center'
        ]
      }
    ],
    rosterByLineupWeeks: [
      {
        playerId: 3917376,
        name: 'Jaylen Brown',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627759.png',
        lineupWeeks: 21,
        keyPieceWeeks: 21,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 3064514,
        name: 'Julius Randle',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203944.png',
        lineupWeeks: 21,
        keyPieceWeeks: 21,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 5124612,
        name: 'VJ Edgecombe',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642845.png',
        lineupWeeks: 21,
        keyPieceWeeks: 18,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 3468,
        name: 'Russell Westbrook',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201566.png',
        lineupWeeks: 15,
        keyPieceWeeks: 11,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4684742,
        name: 'Ausar Thompson',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641709.png',
        lineupWeeks: 14,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'DET',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg'
      },
      {
        playerId: 3136195,
        name: 'Karl-Anthony Towns',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626157.png',
        lineupWeeks: 13,
        keyPieceWeeks: 11,
        proTeamAbbrev: 'NYK',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg'
      },
      {
        playerId: 4594268,
        name: 'Anthony Edwards',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630162.png',
        lineupWeeks: 12,
        keyPieceWeeks: 11,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 4278129,
        name: 'Deandre Ayton',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629028.png',
        lineupWeeks: 12,
        keyPieceWeeks: 7,
        proTeamAbbrev: 'LAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
      },
      {
        playerId: 4396907,
        name: 'Darius Garland',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629636.png',
        lineupWeeks: 11,
        keyPieceWeeks: 9,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4431671,
        name: 'Jaden McDaniels',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630183.png',
        lineupWeeks: 11,
        keyPieceWeeks: 7,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 2595516,
        name: 'Norman Powell',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626181.png',
        lineupWeeks: 11,
        keyPieceWeeks: 9,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 4432816,
        name: 'LaMelo Ball',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630163.png',
        lineupWeeks: 10,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 3936299,
        name: 'Jamal Murray',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627750.png',
        lineupWeeks: 8,
        keyPieceWeeks: 8,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 4066354,
        name: 'Payton Pritchard',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630202.png',
        lineupWeeks: 8,
        keyPieceWeeks: 8,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 4432166,
        name: 'Cade Cunningham',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630595.png',
        lineupWeeks: 7,
        keyPieceWeeks: 7,
        proTeamAbbrev: 'DET',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg'
      },
      {
        playerId: 3934673,
        name: 'Donte DiVincenzo',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628978.png',
        lineupWeeks: 7,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 5105623,
        name: 'Kel\'el Ware',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642276.png',
        lineupWeeks: 7,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 4277811,
        name: 'Collin Sexton',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629012.png',
        lineupWeeks: 6,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4903027,
        name: 'Cedric Coward',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642907.png',
        lineupWeeks: 5,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 3155942,
        name: 'Domantas Sabonis',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627734.png',
        lineupWeeks: 5,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 5144091,
        name: 'Jeremiah Fears',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642847.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 4395723,
        name: 'Keldon Johnson',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629640.png',
        lineupWeeks: 4,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 3138196,
        name: 'Cameron Johnson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629661.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 3102531,
        name: 'Kristaps Porzingis',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/204001.png',
        lineupWeeks: 3,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 4845367,
        name: 'Stephon Castle',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642264.png',
        lineupWeeks: 3,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4277847,
        name: 'Wendell Carter Jr.',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628976.png',
        lineupWeeks: 3,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      },
      {
        playerId: 4600663,
        name: 'Zach Edey',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641744.png',
        lineupWeeks: 3,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4432174,
        name: 'Cam Thomas',
        positions: [
          '—'
        ],
        headshotUrl: 'https://a.espncdn.com/i/headshots/nba/players/full/4432174.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'FA'
      },
      {
        playerId: 4431767,
        name: 'Christian Braun',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631128.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 3032979,
        name: 'Dennis Schroder',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203471.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'CLE',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg'
      },
      {
        playerId: 3134908,
        name: 'Jakob Poeltl',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627751.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'TOR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg'
      },
      {
        playerId: 4065648,
        name: 'Jayson Tatum',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628369.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 4277956,
        name: 'Jordan Poole',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629673.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 3102530,
        name: 'Jusuf Nurkic',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203994.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4397424,
        name: 'Neemias Queta',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629674.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 4278067,
        name: 'Nic Claxton',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629651.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'BKN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg'
      },
      {
        playerId: 3064440,
        name: 'Zach LaVine',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203897.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4683634,
        name: 'Bennedict Mathurin',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631097.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4277961,
        name: 'Jaren Jackson Jr.',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628991.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 2991070,
        name: 'Jerami Grant',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203924.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
      },
      {
        playerId: 3908845,
        name: 'John Collins',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628381.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4594327,
        name: 'Keegan Murray',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631099.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4397014,
        name: 'Quentin Grimes',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629656.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 2583632,
        name: 'Royce O\'Neale',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626220.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4576060,
        name: 'Ryan Kalkbrenner',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641750.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 4431736,
        name: 'Toumani Camara',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641739.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
      }
    ],
    lineupKeyWeeksTeamAvg: 4.5
  }
}

export default data

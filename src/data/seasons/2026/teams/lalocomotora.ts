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
        'Tre Jones',
        'Jaime Jaquez Jr.',
        'Zion Williamson',
        'Neemias Queta',
        'P.J. Washington',
        'Maxime Raynaud',
        'John Collins',
        'Deandre Ayton',
        'Kelly Oubre Jr.',
        'Jamal Shead'
      ],
      footer: 'You kept 2/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Paolo Banchero',
          secondary: '2597 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Kon Knueppel',
          secondary: '2584 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Zion Williamson',
          secondary: '2207 fantasy points',
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
          secondary: 'Rank #2',
          meta: '#2'
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
        name: 'The Role Player'
      },
      howFarYouWent: {
        title: 'Eliminated from playoff contention',
        description: 'You didn\'t make the top 6 and missed the playoffs (regular season #10).'
      },
      motyScoreSnapshot: {
        score: 13.0,
        statsPointsRaw: 3.0,
        stats: 7.3,
        standings: 0.0,
        mva: 5.7
      },
      titles: [
        {
          name: 'Free Fall',
          label: 'Longest losing streak',
          image: '/badges/free-fall.png'
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
        rank: 8,
        valueDisplay: '12777'
      },
      {
        category: 'REB',
        rank: 8,
        valueDisplay: '4261'
      },
      {
        category: 'AST',
        rank: 10,
        valueDisplay: '2669'
      },
      {
        category: 'STL',
        rank: 9,
        valueDisplay: '744'
      },
      {
        category: 'BLK',
        rank: 8,
        valueDisplay: '410'
      },
      {
        category: '3PM',
        rank: 9,
        valueDisplay: '1192'
      },
      {
        category: 'FG%',
        rank: 3,
        valueDisplay: '49.0%'
      },
      {
        category: 'FT%',
        rank: 6,
        valueDisplay: '79.1%'
      },
      {
        category: 'TO',
        rank: 2,
        valueDisplay: '1376'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Paolo Banchero',
        points: 2597
      },
      {
        name: 'Kon Knueppel',
        points: 2584
      },
      {
        name: 'Zion Williamson',
        points: 2207
      },
      {
        name: 'Neemias Queta',
        points: 2163
      },
      {
        name: 'Jaime Jaquez Jr.',
        points: 2111
      },
      {
        name: 'Tre Jones',
        points: 1910
      },
      {
        name: 'Deandre Ayton',
        points: 1905
      },
      {
        name: 'Maxime Raynaud',
        points: 1768
      },
      {
        name: 'John Collins',
        points: 1739
      },
      {
        name: 'P.J. Washington',
        points: 1608
      },
      {
        name: 'Jamal Shead',
        points: 1583
      },
      {
        name: 'Ajay Mitchell',
        points: 1555
      },
      {
        name: 'Kelly Oubre Jr.',
        points: 1251
      },
      {
        name: 'Trae Young',
        points: 516
      }
    ],
    rosterFinal: [
      {
        playerId: 4432573,
        name: 'Paolo Banchero',
        fantasyPoints: 2597,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631094.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
        proTeamAbbrev: 'ORL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 5061575,
        name: 'Kon Knueppel',
        fantasyPoints: 2584,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642851.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
        proTeamAbbrev: 'CHA',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4395628,
        name: 'Zion Williamson',
        fantasyPoints: 2207,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629627.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
        proTeamAbbrev: 'NOP',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4397424,
        name: 'Neemias Queta',
        fantasyPoints: 2163,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629674.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        proTeamAbbrev: 'BOS',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 4432848,
        name: 'Jaime Jaquez Jr.',
        fantasyPoints: 2111,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631170.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
        proTeamAbbrev: 'MIA',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4395626,
        name: 'Tre Jones',
        fantasyPoints: 1910,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630200.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
        proTeamAbbrev: 'CHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4278129,
        name: 'Deandre Ayton',
        fantasyPoints: 1905,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629028.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
        proTeamAbbrev: 'LAL',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 4898371,
        name: 'Maxime Raynaud',
        fantasyPoints: 1768,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642875.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
        proTeamAbbrev: 'SAC',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 3908845,
        name: 'John Collins',
        fantasyPoints: 1739,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628381.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
        proTeamAbbrev: 'LAC',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 4278078,
        name: 'P.J. Washington',
        fantasyPoints: 1608,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629023.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
        proTeamAbbrev: 'DAL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4432241,
        name: 'Jamal Shead',
        fantasyPoints: 1583,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642347.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
        proTeamAbbrev: 'TOR',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4900671,
        name: 'Ajay Mitchell',
        fantasyPoints: 1555,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642349.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
        proTeamAbbrev: 'OKC',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3133603,
        name: 'Kelly Oubre Jr.',
        fantasyPoints: 1251,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626162.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Forward-Guard'
        ]
      },
      {
        playerId: 4277905,
        name: 'Trae Young',
        fantasyPoints: 516,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629027.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
        proTeamAbbrev: 'WAS',
        positions: [
          'Guard'
        ]
      }
    ],
    rosterDrafted: [
      {
        playerId: 4277905,
        name: 'Trae Young',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629027.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
        proTeamAbbrev: 'WAS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3149673,
        name: 'Pascal Siakam',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627783.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
        proTeamAbbrev: 'IND',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4432573,
        name: 'Paolo Banchero',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631094.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
        proTeamAbbrev: 'ORL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3059318,
        name: 'Joel Embiid',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203954.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Center-Forward'
        ]
      },
      {
        playerId: 4066320,
        name: 'Desmond Bane',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630217.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
        proTeamAbbrev: 'ORL',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4869342,
        name: 'Dyson Daniels',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630700.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
        proTeamAbbrev: 'ATL',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4397688,
        name: 'Trey Murphy III',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630530.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
        proTeamAbbrev: 'NOP',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 6450,
        name: 'Kawhi Leonard',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202695.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
        proTeamAbbrev: 'LAC',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4701232,
        name: 'Mark Williams',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631109.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg',
        proTeamAbbrev: 'PHX',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 4066262,
        name: 'Malik Monk',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628370.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
        proTeamAbbrev: 'SAC',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4683634,
        name: 'Bennedict Mathurin',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631097.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
        proTeamAbbrev: 'LAC',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4395630,
        name: 'Devin Vassell',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630170.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
        proTeamAbbrev: 'SAS',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 6477,
        name: 'Jonas Valanciunas',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202685.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
        proTeamAbbrev: 'DEN',
        positions: [
          'Center'
        ]
      }
    ],
    rosterByLineupWeeks: [
      {
        playerId: 4432573,
        name: 'Paolo Banchero',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631094.png',
        lineupWeeks: 19,
        keyPieceWeeks: 17,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      },
      {
        playerId: 5061575,
        name: 'Kon Knueppel',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642851.png',
        lineupWeeks: 18,
        keyPieceWeeks: 18,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 4701232,
        name: 'Mark Williams',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631109.png',
        lineupWeeks: 17,
        keyPieceWeeks: 16,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4900671,
        name: 'Ajay Mitchell',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642349.png',
        lineupWeeks: 16,
        keyPieceWeeks: 12,
        proTeamAbbrev: 'OKC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg'
      },
      {
        playerId: 3149673,
        name: 'Pascal Siakam',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627783.png',
        lineupWeeks: 16,
        keyPieceWeeks: 16,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 4278078,
        name: 'P.J. Washington',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629023.png',
        lineupWeeks: 15,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'DAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg'
      },
      {
        playerId: 6450,
        name: 'Kawhi Leonard',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202695.png',
        lineupWeeks: 14,
        keyPieceWeeks: 13,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4278067,
        name: 'Nic Claxton',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629651.png',
        lineupWeeks: 14,
        keyPieceWeeks: 11,
        proTeamAbbrev: 'BKN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg'
      },
      {
        playerId: 4278585,
        name: 'Collin Gillespie',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631221.png',
        lineupWeeks: 13,
        keyPieceWeeks: 11,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4397014,
        name: 'Quentin Grimes',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629656.png',
        lineupWeeks: 12,
        keyPieceWeeks: 6,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 4066320,
        name: 'Desmond Bane',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630217.png',
        lineupWeeks: 11,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      },
      {
        playerId: 4395626,
        name: 'Tre Jones',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630200.png',
        lineupWeeks: 10,
        keyPieceWeeks: 9,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4683634,
        name: 'Bennedict Mathurin',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631097.png',
        lineupWeeks: 8,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4432848,
        name: 'Jaime Jaquez Jr.',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631170.png',
        lineupWeeks: 7,
        keyPieceWeeks: 7,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 3059318,
        name: 'Joel Embiid',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203954.png',
        lineupWeeks: 6,
        keyPieceWeeks: 4,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 3934719,
        name: 'OG Anunoby',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628384.png',
        lineupWeeks: 5,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'NYK',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg'
      },
      {
        playerId: 4395628,
        name: 'Zion Williamson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629627.png',
        lineupWeeks: 5,
        keyPieceWeeks: 4,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 3135045,
        name: 'Grayson Allen',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628960.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4397424,
        name: 'Neemias Queta',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629674.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 4277905,
        name: 'Trae Young',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629027.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'WAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
      },
      {
        playerId: 3133603,
        name: 'Kelly Oubre Jr.',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626162.png',
        lineupWeeks: 3,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 4433627,
        name: 'Keyonte George',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641718.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4898371,
        name: 'Maxime Raynaud',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642875.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 3032976,
        name: 'Rudy Gobert',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203497.png',
        lineupWeeks: 3,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 4431736,
        name: 'Toumani Camara',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641739.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
      },
      {
        playerId: 4351851,
        name: 'Anfernee Simons',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629014.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4683692,
        name: 'Cason Wallace',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641717.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'OKC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg'
      },
      {
        playerId: 3032979,
        name: 'Dennis Schroder',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203471.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'CLE',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg'
      },
      {
        playerId: 4395630,
        name: 'Devin Vassell',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630170.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4869342,
        name: 'Dyson Daniels',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630700.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'ATL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
      },
      {
        playerId: 4432639,
        name: 'Jabari Smith Jr.',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631095.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'HOU',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg'
      },
      {
        playerId: 3992,
        name: 'James Harden',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201935.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'CLE',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg'
      },
      {
        playerId: 2991070,
        name: 'Jerami Grant',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203924.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
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
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 3062679,
        name: 'Josh Hart',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628404.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'NYK',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg'
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
        playerId: 4278039,
        name: 'Nickeil Alexander-Walker',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629638.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'ATL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
      },
      {
        playerId: 5104155,
        name: 'Bilal Coulibaly',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641731.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'WAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
      },
      {
        playerId: 4278053,
        name: 'Davion Mitchell',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630558.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 4065732,
        name: 'De\'Andre Hunter',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629631.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4278129,
        name: 'Deandre Ayton',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629028.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'LAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
      },
      {
        playerId: 3155526,
        name: 'Dillon Brooks',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628415.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4592691,
        name: 'Jake LaRavia',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631222.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'LAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
      },
      {
        playerId: 4593803,
        name: 'Jalen Williams',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631114.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'OKC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg'
      },
      {
        playerId: 4432241,
        name: 'Jamal Shead',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642347.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'TOR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg'
      },
      {
        playerId: 6477,
        name: 'Jonas Valanciunas',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202685.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 4066336,
        name: 'Lauri Markkanen',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628374.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4066262,
        name: 'Malik Monk',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628370.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4576060,
        name: 'Ryan Kalkbrenner',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641750.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 4397688,
        name: 'Trey Murphy III',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630530.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 4277847,
        name: 'Wendell Carter Jr.',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628976.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      }
    ],
    lineupKeyWeeksTeamAvg: 4.1
  }
}

export default data

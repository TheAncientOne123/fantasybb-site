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
      currentCount: 13,
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
        'Ty Jerome',
        'Anthony Davis',
        'Jalen Slawson',
        'Keyonte George',
        'Giannis Antetokounmpo'
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
          secondary: '3516 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Victor Wembanyama',
          secondary: '3438 fantasy points',
          meta: '#2'
        },
        {
          primary: 'DeMar DeRozan',
          secondary: '2480 fantasy points',
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
      howFarYouWent: {
        title: 'Eliminated from playoff contention',
        description: 'You didn\'t make the top 6 and missed the playoffs (regular season #8).'
      },
      motyScoreSnapshot: {
        score: 32.7,
        statsPointsRaw: 6.0,
        stats: 18.2,
        standings: 4.7,
        mva: 9.8
      },
      titles: [
        {
          name: 'The Caretaker',
          label: '#1 en TO (menos turnovers)',
          image: '/badges/the-caretaker-badge.png'
        }
      ],
      summaryInsights: {
        rival: {
          stat: '2 games · 5515 pts combined',
          opponentTeamId: 'novigrad-21ers'
        },
        nemesis: {
          stat: 'Week 19 · L 885–1374 (−489 pts)',
          opponentTeamId: 'lububumatcha'
        },
        closestGame: {
          stat: 'Week 3 · 1322–1294 (W, 28-pt margin)',
          opponentTeamId: 'novigrad-21ers'
        },
        highestScoringWeek: {
          stat: 'Week 15 · 1542 pts',
          opponentTeamId: 'beijing-ducks'
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
        rank: 10,
        valueDisplay: '12505'
      },
      {
        category: 'REB',
        rank: 9,
        valueDisplay: '4015'
      },
      {
        category: 'AST',
        rank: 9,
        valueDisplay: '2834'
      },
      {
        category: 'STL',
        rank: 10,
        valueDisplay: '703'
      },
      {
        category: 'BLK',
        rank: 3,
        valueDisplay: '580'
      },
      {
        category: '3PM',
        rank: 7,
        valueDisplay: '1263'
      },
      {
        category: 'FG%',
        rank: 10,
        valueDisplay: '46.8%'
      },
      {
        category: 'FT%',
        rank: 2,
        valueDisplay: '82.4%'
      },
      {
        category: 'TO',
        rank: 1,
        valueDisplay: '1351'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Tyrese Maxey',
        points: 3516
      },
      {
        name: 'Victor Wembanyama',
        points: 3438
      },
      {
        name: 'DeMar DeRozan',
        points: 2480
      },
      {
        name: 'Derik Queen',
        points: 2132
      },
      {
        name: 'Keyonte George',
        points: 2110
      },
      {
        name: 'Andrew Nembhard',
        points: 1941
      },
      {
        name: 'Anthony Black',
        points: 1844
      },
      {
        name: 'Giannis Antetokounmpo',
        points: 1777
      },
      {
        name: 'Joel Embiid',
        points: 1603
      },
      {
        name: 'Kyshawn George',
        points: 1499
      },
      {
        name: 'Anthony Davis',
        points: 870
      },
      {
        name: 'Ty Jerome',
        points: 557
      },
      {
        name: 'Jalen Slawson',
        points: 232
      }
    ],
    rosterFinal: [
      {
        playerId: 4431678,
        name: 'Tyrese Maxey',
        fantasyPoints: 3516,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630178.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 5104157,
        name: 'Victor Wembanyama',
        fantasyPoints: 3438,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641705.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
        proTeamAbbrev: 'SAS',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 3978,
        name: 'DeMar DeRozan',
        fantasyPoints: 2480,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201942.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
        proTeamAbbrev: 'SAC',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4869780,
        name: 'Derik Queen',
        fantasyPoints: 2132,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642852.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
        proTeamAbbrev: 'NOP',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 4433627,
        name: 'Keyonte George',
        fantasyPoints: 2110,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641718.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg',
        proTeamAbbrev: 'UTA',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4395712,
        name: 'Andrew Nembhard',
        fantasyPoints: 1941,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629614.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
        proTeamAbbrev: 'IND',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4712849,
        name: 'Anthony Black',
        fantasyPoints: 1844,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641710.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
        proTeamAbbrev: 'ORL',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3032977,
        name: 'Giannis Antetokounmpo',
        fantasyPoints: 1777,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203507.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
        proTeamAbbrev: 'MIL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3059318,
        name: 'Joel Embiid',
        fantasyPoints: 1603,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203954.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Center-Forward'
        ]
      },
      {
        playerId: 5174563,
        name: 'Kyshawn George',
        fantasyPoints: 1499,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642273.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
        proTeamAbbrev: 'WAS',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 6583,
        name: 'Anthony Davis',
        fantasyPoints: 870,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203076.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
        proTeamAbbrev: 'WAS',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 4065733,
        name: 'Ty Jerome',
        fantasyPoints: 557,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629660.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg',
        proTeamAbbrev: 'MEM',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4398207,
        name: 'Jalen Slawson',
        fantasyPoints: 232,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641771.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
        proTeamAbbrev: 'IND',
        positions: [
          'Forward'
        ]
      }
    ],
    rosterDrafted: [
      {
        playerId: 5104157,
        name: 'Victor Wembanyama',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641705.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
        proTeamAbbrev: 'SAS',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 4431678,
        name: 'Tyrese Maxey',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630178.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4871145,
        name: 'Josh Giddey',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630581.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
        proTeamAbbrev: 'CHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3978,
        name: 'DeMar DeRozan',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201942.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
        proTeamAbbrev: 'SAC',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4066383,
        name: 'Miles Bridges',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628970.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
        proTeamAbbrev: 'CHA',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3133628,
        name: 'Myles Turner',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626167.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
        proTeamAbbrev: 'MIL',
        positions: [
          'Center-Forward'
        ]
      },
      {
        playerId: 3134908,
        name: 'Jakob Poeltl',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627751.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
        proTeamAbbrev: 'TOR',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 2490149,
        name: 'CJ McCollum',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203468.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
        proTeamAbbrev: 'ATL',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4351851,
        name: 'Anfernee Simons',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629014.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
        proTeamAbbrev: 'CHI',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4251,
        name: 'Paul George',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202331.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4873138,
        name: 'Ace Bailey',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642846.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg',
        proTeamAbbrev: 'UTA',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3134907,
        name: 'Kyle Kuzma',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628398.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
        proTeamAbbrev: 'MIL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3138196,
        name: 'Cameron Johnson',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629661.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
        proTeamAbbrev: 'DEN',
        positions: [
          'Forward'
        ]
      }
    ],
    rosterByLineupWeeks: [
      {
        playerId: 3978,
        name: 'DeMar DeRozan',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201942.png',
        lineupWeeks: 21,
        keyPieceWeeks: 20,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4431678,
        name: 'Tyrese Maxey',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630178.png',
        lineupWeeks: 19,
        keyPieceWeeks: 19,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 5104157,
        name: 'Victor Wembanyama',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641705.png',
        lineupWeeks: 18,
        keyPieceWeeks: 18,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4395712,
        name: 'Andrew Nembhard',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629614.png',
        lineupWeeks: 17,
        keyPieceWeeks: 17,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 4066383,
        name: 'Miles Bridges',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628970.png',
        lineupWeeks: 13,
        keyPieceWeeks: 12,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 5174563,
        name: 'Kyshawn George',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642273.png',
        lineupWeeks: 12,
        keyPieceWeeks: 8,
        proTeamAbbrev: 'WAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
      },
      {
        playerId: 4397424,
        name: 'Neemias Queta',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629674.png',
        lineupWeeks: 12,
        keyPieceWeeks: 8,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 3133628,
        name: 'Myles Turner',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626167.png',
        lineupWeeks: 11,
        keyPieceWeeks: 7,
        proTeamAbbrev: 'MIL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg'
      },
      {
        playerId: 4251,
        name: 'Paul George',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202331.png',
        lineupWeeks: 11,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 4871145,
        name: 'Josh Giddey',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630581.png',
        lineupWeeks: 10,
        keyPieceWeeks: 9,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4593125,
        name: 'Santi Aldama',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630583.png',
        lineupWeeks: 10,
        keyPieceWeeks: 8,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4869780,
        name: 'Derik Queen',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642852.png',
        lineupWeeks: 9,
        keyPieceWeeks: 8,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 3155526,
        name: 'Dillon Brooks',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628415.png',
        lineupWeeks: 9,
        keyPieceWeeks: 6,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4432639,
        name: 'Jabari Smith Jr.',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631095.png',
        lineupWeeks: 7,
        keyPieceWeeks: 6,
        proTeamAbbrev: 'HOU',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg'
      },
      {
        playerId: 4712849,
        name: 'Anthony Black',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641710.png',
        lineupWeeks: 6,
        keyPieceWeeks: 6,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      },
      {
        playerId: 3059318,
        name: 'Joel Embiid',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203954.png',
        lineupWeeks: 6,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 4683747,
        name: 'Jaylon Tyson',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642281.png',
        lineupWeeks: 5,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'CLE',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg'
      },
      {
        playerId: 4397002,
        name: 'Ayo Dosunmu',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630245.png',
        lineupWeeks: 4,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 4432809,
        name: 'Cole Anthony',
        positions: [
          '—'
        ],
        headshotUrl: 'https://a.espncdn.com/i/headshots/nba/players/full/4432809.png',
        lineupWeeks: 4,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'FA'
      },
      {
        playerId: 4278129,
        name: 'Deandre Ayton',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629028.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'LAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
      },
      {
        playerId: 4395630,
        name: 'Devin Vassell',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630170.png',
        lineupWeeks: 4,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4711294,
        name: 'Matas Buzelis',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641824.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 2583632,
        name: 'Royce O\'Neale',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626220.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4683678,
        name: 'Scoot Henderson',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630703.png',
        lineupWeeks: 4,
        keyPieceWeeks: 4,
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
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4433083,
        name: 'Cam Spencer',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642285.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4687718,
        name: 'Josh Minott',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631169.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'BKN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg'
      },
      {
        playerId: 4873138,
        name: 'Ace Bailey',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642846.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4903027,
        name: 'Cedric Coward',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642907.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4398207,
        name: 'Jalen Slawson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641771.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 5105623,
        name: 'Kel\'el Ware',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642276.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 3133603,
        name: 'Kelly Oubre Jr.',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626162.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 4433249,
        name: 'Moussa Diabate',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631217.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 3149673,
        name: 'Pascal Siakam',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627783.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 4431785,
        name: 'Scotty Pippen Jr.',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630590.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4065733,
        name: 'Ty Jerome',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629660.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4396909,
        name: 'Aaron Nesmith',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630174.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 4433144,
        name: 'Caleb Love',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631126.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
      },
      {
        playerId: 3138196,
        name: 'Cameron Johnson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629661.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 2490149,
        name: 'CJ McCollum',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203468.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'ATL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
      },
      {
        playerId: 3134908,
        name: 'Jakob Poeltl',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627751.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'TOR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg'
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
        playerId: 4433247,
        name: 'Jonathan Kuminga',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630228.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'ATL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
      },
      {
        playerId: 3134907,
        name: 'Kyle Kuzma',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628398.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MIL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg'
      }
    ],
    lineupKeyWeeksTeamAvg: 4.6
  }
}

export default data

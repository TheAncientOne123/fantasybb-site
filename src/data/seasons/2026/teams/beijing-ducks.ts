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
      currentCount: 13,
      kept: [
        'Nikola Jokic',
        'Kevin Durant',
        'Derrick White',
        'RJ Barrett',
        'Tyler Herro'
      ],
      lost: [
        'Jalen Brunson',
        'Jalen Johnson',
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
        'Jalen Williams',
        'Daniss Jenkins',
        'Precious Achiuwa',
        'Jalen Green',
        'Justin Champagnie',
        'Brook Lopez'
      ],
      footer: 'You kept 5/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Nikola Jokic',
          secondary: '4124 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Kevin Durant',
          secondary: '3279 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Derrick White',
          secondary: '2802 fantasy points',
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
          secondary: 'Rank #2',
          meta: '#2'
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
      title: 'Lost in Finals',
      description: 'You reached the championship and fell short',
      outcome: 'lost_finals',
      standing: 2,
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
      howFarYouWent: {
        title: 'Lost in Finals',
        description: 'You reached the championship and fell short'
      },
      motyScoreSnapshot: {
        score: 77.2,
        statsPointsRaw: 9.0,
        stats: 29.1,
        standings: 21.0,
        mva: 27.1
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
          name: 'The Cold Blooded',
          label: '#1 en FT%',
          image: '/badges/the-coldblooded-badge.png'
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
        rank: 2,
        valueDisplay: '15629'
      },
      {
        category: 'REB',
        rank: 7,
        valueDisplay: '4430'
      },
      {
        category: 'AST',
        rank: 2,
        valueDisplay: '3812'
      },
      {
        category: 'STL',
        rank: 8,
        valueDisplay: '758'
      },
      {
        category: 'BLK',
        rank: 7,
        valueDisplay: '511'
      },
      {
        category: '3PM',
        rank: 2,
        valueDisplay: '1685'
      },
      {
        category: 'FG%',
        rank: 5,
        valueDisplay: '47.7%'
      },
      {
        category: 'FT%',
        rank: 1,
        valueDisplay: '83.5%'
      },
      {
        category: 'TO',
        rank: 7,
        valueDisplay: '1774'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Nikola Jokic',
        points: 4124
      },
      {
        name: 'Kevin Durant',
        points: 3279
      },
      {
        name: 'Derrick White',
        points: 2802
      },
      {
        name: 'Trey Murphy III',
        points: 2673
      },
      {
        name: 'Brandon Miller',
        points: 2129
      },
      {
        name: 'RJ Barrett',
        points: 1728
      },
      {
        name: 'Precious Achiuwa',
        points: 1670
      },
      {
        name: 'Justin Champagnie',
        points: 1424
      },
      {
        name: 'Brook Lopez',
        points: 1411
      },
      {
        name: 'Daniss Jenkins',
        points: 1355
      },
      {
        name: 'Jalen Williams',
        points: 1092
      },
      {
        name: 'Tyler Herro',
        points: 1089
      },
      {
        name: 'Jalen Green',
        points: 836
      }
    ],
    rosterFinal: [
      {
        playerId: 3112335,
        name: 'Nikola Jokic',
        fantasyPoints: 4124,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203999.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
        proTeamAbbrev: 'DEN',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 3202,
        name: 'Kevin Durant',
        fantasyPoints: 3279,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201142.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
        proTeamAbbrev: 'HOU',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3078576,
        name: 'Derrick White',
        fantasyPoints: 2802,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628401.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        proTeamAbbrev: 'BOS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4397688,
        name: 'Trey Murphy III',
        fantasyPoints: 2673,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630530.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
        proTeamAbbrev: 'NOP',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4433287,
        name: 'Brandon Miller',
        fantasyPoints: 2129,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641706.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
        proTeamAbbrev: 'CHA',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4395625,
        name: 'RJ Barrett',
        fantasyPoints: 1728,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629628.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
        proTeamAbbrev: 'TOR',
        positions: [
          'Forward-Guard'
        ]
      },
      {
        playerId: 4431679,
        name: 'Precious Achiuwa',
        fantasyPoints: 1670,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630173.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
        proTeamAbbrev: 'SAC',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4432907,
        name: 'Justin Champagnie',
        fantasyPoints: 1424,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630551.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
        proTeamAbbrev: 'WAS',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 3448,
        name: 'Brook Lopez',
        fantasyPoints: 1411,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201572.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
        proTeamAbbrev: 'LAC',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 5107199,
        name: 'Daniss Jenkins',
        fantasyPoints: 1355,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642450.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg',
        proTeamAbbrev: 'DET',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4593803,
        name: 'Jalen Williams',
        fantasyPoints: 1092,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631114.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
        proTeamAbbrev: 'OKC',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 4395725,
        name: 'Tyler Herro',
        fantasyPoints: 1089,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629639.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
        proTeamAbbrev: 'MIA',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4437244,
        name: 'Jalen Green',
        fantasyPoints: 836,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630224.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg',
        proTeamAbbrev: 'PHX',
        positions: [
          'Guard'
        ]
      }
    ],
    rosterDrafted: [
      {
        playerId: 3112335,
        name: 'Nikola Jokic',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203999.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
        proTeamAbbrev: 'DEN',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 3934672,
        name: 'Jalen Brunson',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628973.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
        proTeamAbbrev: 'NYK',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3202,
        name: 'Kevin Durant',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201142.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
        proTeamAbbrev: 'HOU',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4701230,
        name: 'Jalen Johnson',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630552.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
        proTeamAbbrev: 'ATL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3078576,
        name: 'Derrick White',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628401.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        proTeamAbbrev: 'BOS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4395625,
        name: 'RJ Barrett',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629628.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
        proTeamAbbrev: 'TOR',
        positions: [
          'Forward-Guard'
        ]
      },
      {
        playerId: 4395725,
        name: 'Tyler Herro',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629639.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
        proTeamAbbrev: 'MIA',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 3102531,
        name: 'Kristaps Porzingis',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/204001.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
        proTeamAbbrev: 'GSW',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 4711272,
        name: 'Reed Sheppard',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642263.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
        proTeamAbbrev: 'HOU',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4684742,
        name: 'Ausar Thompson',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641709.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg',
        proTeamAbbrev: 'DET',
        positions: [
          'Guard-Forward'
        ]
      },
      {
        playerId: 6442,
        name: 'Kyrie Irving',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202681.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
        proTeamAbbrev: 'DAL',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4432639,
        name: 'Jabari Smith Jr.',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631095.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
        proTeamAbbrev: 'HOU',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4397020,
        name: 'Luguentz Dort',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629652.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
        proTeamAbbrev: 'OKC',
        positions: [
          'Guard'
        ]
      }
    ],
    rosterByLineupWeeks: [
      {
        playerId: 3078576,
        name: 'Derrick White',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628401.png',
        lineupWeeks: 21,
        keyPieceWeeks: 19,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 3934672,
        name: 'Jalen Brunson',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628973.png',
        lineupWeeks: 21,
        keyPieceWeeks: 19,
        proTeamAbbrev: 'NYK',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg'
      },
      {
        playerId: 4701230,
        name: 'Jalen Johnson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630552.png',
        lineupWeeks: 21,
        keyPieceWeeks: 19,
        proTeamAbbrev: 'ATL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
      },
      {
        playerId: 3202,
        name: 'Kevin Durant',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201142.png',
        lineupWeeks: 21,
        keyPieceWeeks: 20,
        proTeamAbbrev: 'HOU',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg'
      },
      {
        playerId: 4397688,
        name: 'Trey Murphy III',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630530.png',
        lineupWeeks: 21,
        keyPieceWeeks: 16,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 4433287,
        name: 'Brandon Miller',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641706.png',
        lineupWeeks: 18,
        keyPieceWeeks: 16,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 3112335,
        name: 'Nikola Jokic',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203999.png',
        lineupWeeks: 18,
        keyPieceWeeks: 17,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 4395625,
        name: 'RJ Barrett',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629628.png',
        lineupWeeks: 16,
        keyPieceWeeks: 13,
        proTeamAbbrev: 'TOR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg'
      },
      {
        playerId: 3059319,
        name: 'Andrew Wiggins',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203952.png',
        lineupWeeks: 15,
        keyPieceWeeks: 12,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 4433627,
        name: 'Keyonte George',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641718.png',
        lineupWeeks: 13,
        keyPieceWeeks: 13,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4395725,
        name: 'Tyler Herro',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629639.png',
        lineupWeeks: 11,
        keyPieceWeeks: 9,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 3102531,
        name: 'Kristaps Porzingis',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/204001.png',
        lineupWeeks: 8,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 4437244,
        name: 'Jalen Green',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630224.png',
        lineupWeeks: 6,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 3155526,
        name: 'Dillon Brooks',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628415.png',
        lineupWeeks: 5,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 6589,
        name: 'Draymond Green',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203110.png',
        lineupWeeks: 5,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 4712849,
        name: 'Anthony Black',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641710.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      },
      {
        playerId: 4684742,
        name: 'Ausar Thompson',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641709.png',
        lineupWeeks: 4,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'DET',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg'
      },
      {
        playerId: 4066328,
        name: 'Jarrett Allen',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628386.png',
        lineupWeeks: 4,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'CLE',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg'
      },
      {
        playerId: 4278067,
        name: 'Nic Claxton',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629651.png',
        lineupWeeks: 4,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'BKN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg'
      },
      {
        playerId: 4395630,
        name: 'Devin Vassell',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630170.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4432639,
        name: 'Jabari Smith Jr.',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631095.png',
        lineupWeeks: 3,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'HOU',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg'
      },
      {
        playerId: 6430,
        name: 'Jimmy Butler III',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202710.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 4397424,
        name: 'Neemias Queta',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629674.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
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
        playerId: 3138196,
        name: 'Cameron Johnson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629661.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 5107199,
        name: 'Daniss Jenkins',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642450.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'DET',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg'
      },
      {
        playerId: 4997536,
        name: 'Gui Santos',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630611.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 6578,
        name: 'Harrison Barnes',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203084.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4593803,
        name: 'Jalen Williams',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631114.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'OKC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg'
      },
      {
        playerId: 4065731,
        name: 'Jay Huff',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630643.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 4433247,
        name: 'Jonathan Kuminga',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630228.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'ATL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
      },
      {
        playerId: 4431679,
        name: 'Precious Achiuwa',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630173.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 3064482,
        name: 'Bobby Portis',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626171.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MIL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg'
      },
      {
        playerId: 3448,
        name: 'Brook Lopez',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201572.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4277811,
        name: 'Collin Sexton',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629012.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
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
        playerId: 4278129,
        name: 'Deandre Ayton',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629028.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'LAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
      },
      {
        playerId: 5037871,
        name: 'Dylan Harper',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642844.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 5175643,
        name: 'Egor Demin',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642856.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'BKN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg'
      },
      {
        playerId: 4566434,
        name: 'Franz Wagner',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630532.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      },
      {
        playerId: 3135045,
        name: 'Grayson Allen',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628960.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4683766,
        name: 'Isaiah Collier',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642268.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4279888,
        name: 'Ja Morant',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629630.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4397189,
        name: 'Jalen Smith',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630188.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4432907,
        name: 'Justin Champagnie',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630551.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'WAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
      },
      {
        playerId: 5061575,
        name: 'Kon Knueppel',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642851.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
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
        playerId: 4433192,
        name: 'Tari Eason',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631106.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'HOU',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg'
      },
      {
        playerId: 6440,
        name: 'Tobias Harris',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202699.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DET',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg'
      },
      {
        playerId: 4431736,
        name: 'Toumani Camara',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641739.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
      }
    ],
    lineupKeyWeeksTeamAvg: 4.1
  }
}

export default data

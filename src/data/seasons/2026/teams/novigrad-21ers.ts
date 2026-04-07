/**
 * Team rewind data – Novigrad 21ers 
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../../../rewind-types'

const data: TeamRewindData = {
  id: 'novigrad-21ers',
  displayName: 'Novigrad 21ers ',
  owner: 'Hector Sanchez',
  description: '',
  theme: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    accent: '#a78bfa',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'Novigrad 21ers ',
      footer: 'Fantasy Rewind',
      image: '/team-logos/novigrad-21ers-logo.png'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '11-7-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#3'
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
      highlightTeamId: 'novigrad-21ers',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '5W / 4L',
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
      highlightTeamId: 'novigrad-21ers',
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
      highlightTeamId: 'novigrad-21ers',
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
                y: 25042.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 23164.0
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
      value: '#1',
      label: 'I am consistent',
      description: 'Std dev: 166.8',
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
        label: 'Novigrad 21ers ',
        value: '#1'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 4,
      result: 'W',
      me: {
        name: 'Novigrad 21ers ',
        score: 1651
      },
      opp: {
        name: 'LububuMatcha',
        score: 1489
      },
      margin: 162,
      note: 'vs LububuMatcha',
      footer: 'Worst week: 943 (Week 8)'
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
      highlightTeamId: 'novigrad-21ers',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '2-4',
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
          title: 'vs METEFIERROS',
          detail: '1294–1322 (28 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 8',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '943–883 (60 pts)',
          kind: 'win'
        },
        {
          label: 'Week 10',
          title: 'vs Tochetaos',
          detail: '1333–1425 (92 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'vs METEFIERROS',
          detail: '1418–1481 (63 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 16',
          title: 'vs Glizzy Goblers',
          detail: '1338–1282 (56 pts)',
          kind: 'win'
        },
        {
          label: 'Week 18',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1284–1363 (79 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'award',
      title: 'The Choke',
      badgeName: 'Most Close Losses',
      description: 'Lost 4 close games (≤100 pts margin)',
      footer: 'So close...',
      awardTier: 'no-award',
      image: '/badges/the-choke.png'
    },
    {
      type: 'timeline',
      title: 'Close Losses',
      subtitle: 'The Choke moments',
      events: [
        {
          label: 'Week 3',
          title: 'Lost to METEFIERROS',
          detail: '1294–1322 (28 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 10',
          title: 'Lost to Tochetaos',
          detail: '1333–1425 (92 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 12',
          title: 'Lost to METEFIERROS',
          detail: '1418–1481 (63 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 18',
          title: 'Lost to 北京首钢霹雳鸭',
          detail: '1284–1363 (79 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Heartbreak'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 3,
      result: 'L',
      me: {
        name: 'Novigrad 21ers ',
        score: 1294
      },
      opp: {
        name: 'METEFIERROS',
        score: 1322
      },
      margin: 28,
      note: '28.0-point heartbreak',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'Glizzy Goblers',
      label: '2 games',
      description: '5671 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'Glizzy Goblers',
      events: [
        {
          label: 'Week 7',
          title: 'vs Glizzy Goblers',
          detail: '1650–1401 (W)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs Glizzy Goblers',
          detail: '1338–1282 (W)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 11,
      result: 'L',
      me: {
        name: 'Novigrad 21ers ',
        score: 1339
      },
      opp: {
        name: 'Diego\'s Daring Team',
        score: 1672
      },
      margin: 333,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 13,
      kept: [
        'Cooper Flagg',
        'Austin Reaves',
        'Alperen Sengun',
        'Franz Wagner'
      ],
      lost: [
        'Domantas Sabonis',
        'Josh Hart',
        'Deni Avdija',
        'Christian Braun',
        'Payton Pritchard',
        'Deandre Ayton',
        'Daniel Gafford',
        'Kelly Oubre Jr.',
        'Egor Demin'
      ],
      added: [
        'Stephon Castle',
        'Bam Adebayo',
        'Isaiah Hartenstein',
        'Darius Garland',
        'Paul George',
        'Pascal Siakam',
        'Bilal Coulibaly',
        'Will Riley',
        'Draymond Green'
      ],
      footer: 'You kept 4/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Alperen Sengun',
          secondary: '3068 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Bam Adebayo',
          secondary: '2666 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Cooper Flagg',
          secondary: '2647 fantasy points',
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
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: 'REB',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: 'AST',
          secondary: 'Rank #1',
          meta: '#1'
        },
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
      badgeName: 'The Swiss Army Knife',
      description: 'Top 3 en 4 categorías. Versatilidad.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'award',
      title: 'Manager Of The Year',
      badgeName: 'MOTY ',
      description: '40 pts Stats (9CAT podio, normalizado en la liga), 21 pts Standings (RS antes de playoffs), 39 pts MVA — Managerial Value Added: eficiencia de alineación + impacto de transacciones (waivers/trades), normalizado en la liga. El campeón de playoffs no suma a MOTY (premio separado: Larry). Cada pilar 0–100 interno; aporte = fracción × norm; total máximo 100.',
      footer: '40 / 21 / 39 pts (Stats / Standings / MVA); campeón no suma a MOTY',
      image: '/badges/manager-of-the-year.png',
      motyBreakdown: {
        stats: 40.0,
        standings: 16.3,
        mva: 35.4
      }
    },
    {
      type: 'list',
      title: 'Category Titles',
      subtitle: 'First place honors',
      items: [
        {
          primary: 'The Scoring King',
          secondary: '#1 en PTS',
          image: '/badges/the-scoring-king-badge.png'
        },
        {
          primary: 'The Worm',
          secondary: '#1 en REB',
          image: '/badges/the-worm-badge.png'
        },
        {
          primary: 'The Point God',
          secondary: '#1 en AST',
          image: '/badges/the-poing-god-badge.png'
        },
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
      title: 'Champion',
      description: 'You won the league',
      outcome: 'champion',
      standing: 1,
      footer: 'How far you went'
    },
    {
      type: 'summary',
      title: 'Your Season Summary',
      subtitle: 'Novigrad 21ers ',
      record: {
        value: '11-7-0',
        standing: '#3'
      },
      archetype: {
        name: 'The Swiss Army Knife'
      },
      howFarYouWent: {
        title: 'Champion',
        description: 'You won the league'
      },
      motyScoreSnapshot: {
        score: 91.7,
        statsPointsRaw: 12.0,
        stats: 40.0,
        standings: 16.3,
        mva: 35.4
      },
      titles: [
        {
          name: 'The Choke',
          label: 'Most close losses',
          image: '/badges/the-choke.png'
        },
        {
          name: 'Manager Of The Year',
          label: 'MOTY',
          image: '/badges/manager-of-the-year.png'
        },
        {
          name: 'The Scoring King',
          label: '#1 en PTS',
          image: '/badges/the-scoring-king-badge.png'
        },
        {
          name: 'The Worm',
          label: '#1 en REB',
          image: '/badges/the-worm-badge.png'
        },
        {
          name: 'The Point God',
          label: '#1 en AST',
          image: '/badges/the-poing-god-badge.png'
        },
        {
          name: 'The Grand Theft Alvarado',
          label: '#1 en STL',
          image: '/badges/grand-theft-alvarado.png'
        }
      ],
      summaryInsights: {
        rival: {
          stat: '2 games · 5671 pts combined',
          opponentTeamId: 'glizzy-goblers'
        },
        nemesis: {
          stat: 'Week 11 · L 1339–1672 (−333 pts)',
          opponentTeamId: 'diegos-daring-team'
        },
        closestGame: {
          stat: 'Week 3 · 1294–1322 (L, 28-pt margin)',
          opponentTeamId: 'metefierros'
        },
        highestScoringWeek: {
          stat: 'Week 4 · 1651 pts',
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
      highlightTeamId: 'novigrad-21ers'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Novigrad 21ers ',
      footer: 'Fantasy Rewind'
    }
  ],
  profileStats: {
    nineCat: [
      {
        category: 'PTS',
        rank: 1,
        valueDisplay: '15826'
      },
      {
        category: 'REB',
        rank: 1,
        valueDisplay: '5553'
      },
      {
        category: 'AST',
        rank: 1,
        valueDisplay: '4008'
      },
      {
        category: 'STL',
        rank: 1,
        valueDisplay: '951'
      },
      {
        category: 'BLK',
        rank: 5,
        valueDisplay: '525'
      },
      {
        category: '3PM',
        rank: 4,
        valueDisplay: '1517'
      },
      {
        category: 'FG%',
        rank: 4,
        valueDisplay: '48.1%'
      },
      {
        category: 'FT%',
        rank: 9,
        valueDisplay: '77.9%'
      },
      {
        category: 'TO',
        rank: 10,
        valueDisplay: '1949'
      }
    ],
    rosterFantasyPoints: [
      {
        name: 'Alperen Sengun',
        points: 3068
      },
      {
        name: 'Bam Adebayo',
        points: 2666
      },
      {
        name: 'Cooper Flagg',
        points: 2647
      },
      {
        name: 'Pascal Siakam',
        points: 2420
      },
      {
        name: 'Stephon Castle',
        points: 2297
      },
      {
        name: 'Austin Reaves',
        points: 2043
      },
      {
        name: 'Draymond Green',
        points: 1686
      },
      {
        name: 'Darius Garland',
        points: 1453
      },
      {
        name: 'Bilal Coulibaly',
        points: 1400
      },
      {
        name: 'Isaiah Hartenstein',
        points: 1374
      },
      {
        name: 'Paul George',
        points: 1231
      },
      {
        name: 'Will Riley',
        points: 1205
      },
      {
        name: 'Franz Wagner',
        points: 1071
      }
    ],
    rosterFinal: [
      {
        playerId: 4871144,
        name: 'Alperen Sengun',
        fantasyPoints: 3068,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630578.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
        proTeamAbbrev: 'HOU',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 4066261,
        name: 'Bam Adebayo',
        fantasyPoints: 2666,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628389.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
        proTeamAbbrev: 'MIA',
        positions: [
          'Center-Forward'
        ]
      },
      {
        playerId: 5041939,
        name: 'Cooper Flagg',
        fantasyPoints: 2647,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642843.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
        proTeamAbbrev: 'DAL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3149673,
        name: 'Pascal Siakam',
        fantasyPoints: 2420,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627783.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
        proTeamAbbrev: 'IND',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4845367,
        name: 'Stephon Castle',
        fantasyPoints: 2297,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642264.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
        proTeamAbbrev: 'SAS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4066457,
        name: 'Austin Reaves',
        fantasyPoints: 2043,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630559.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
        proTeamAbbrev: 'LAL',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 6589,
        name: 'Draymond Green',
        fantasyPoints: 1686,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203110.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
        proTeamAbbrev: 'GSW',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4396907,
        name: 'Darius Garland',
        fantasyPoints: 1453,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629636.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
        proTeamAbbrev: 'LAC',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 5104155,
        name: 'Bilal Coulibaly',
        fantasyPoints: 1400,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641731.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
        proTeamAbbrev: 'WAS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4222252,
        name: 'Isaiah Hartenstein',
        fantasyPoints: 1374,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628392.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
        proTeamAbbrev: 'OKC',
        positions: [
          'Center-Forward'
        ]
      },
      {
        playerId: 4251,
        name: 'Paul George',
        fantasyPoints: 1231,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202331.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 5144126,
        name: 'Will Riley',
        fantasyPoints: 1205,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642860.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg',
        proTeamAbbrev: 'WAS',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4566434,
        name: 'Franz Wagner',
        fantasyPoints: 1071,
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630532.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
        proTeamAbbrev: 'ORL',
        positions: [
          'Forward'
        ]
      }
    ],
    rosterDrafted: [
      {
        playerId: 4871144,
        name: 'Alperen Sengun',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630578.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
        proTeamAbbrev: 'HOU',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 3155942,
        name: 'Domantas Sabonis',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627734.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
        proTeamAbbrev: 'SAC',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 4566434,
        name: 'Franz Wagner',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630532.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
        proTeamAbbrev: 'ORL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 5041939,
        name: 'Cooper Flagg',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642843.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
        proTeamAbbrev: 'DAL',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 3062679,
        name: 'Josh Hart',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628404.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
        proTeamAbbrev: 'NYK',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4066457,
        name: 'Austin Reaves',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630559.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
        proTeamAbbrev: 'LAL',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4683021,
        name: 'Deni Avdija',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630166.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg',
        proTeamAbbrev: 'POR',
        positions: [
          'Forward'
        ]
      },
      {
        playerId: 4431767,
        name: 'Christian Braun',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631128.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
        proTeamAbbrev: 'DEN',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4066354,
        name: 'Payton Pritchard',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630202.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        proTeamAbbrev: 'BOS',
        positions: [
          'Guard'
        ]
      },
      {
        playerId: 4278129,
        name: 'Deandre Ayton',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629028.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
        proTeamAbbrev: 'LAL',
        positions: [
          'Center'
        ]
      },
      {
        playerId: 4278049,
        name: 'Daniel Gafford',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629655.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
        proTeamAbbrev: 'DAL',
        positions: [
          'Forward-Center'
        ]
      },
      {
        playerId: 3133603,
        name: 'Kelly Oubre Jr.',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1626162.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
        proTeamAbbrev: 'PHI',
        positions: [
          'Forward-Guard'
        ]
      },
      {
        playerId: 5175643,
        name: 'Egor Demin',
        proTeamFromNbaCatalog: true,
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642856.png',
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
        proTeamAbbrev: 'BKN',
        positions: [
          'Guard'
        ]
      }
    ],
    rosterByLineupWeeks: [
      {
        playerId: 5041939,
        name: 'Cooper Flagg',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642843.png',
        lineupWeeks: 20,
        keyPieceWeeks: 19,
        proTeamAbbrev: 'DAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg'
      },
      {
        playerId: 3062679,
        name: 'Josh Hart',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628404.png',
        lineupWeeks: 18,
        keyPieceWeeks: 12,
        proTeamAbbrev: 'NYK',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg'
      },
      {
        playerId: 4396971,
        name: 'Naz Reid',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629675.png',
        lineupWeeks: 17,
        keyPieceWeeks: 11,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 4845367,
        name: 'Stephon Castle',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642264.png',
        lineupWeeks: 16,
        keyPieceWeeks: 15,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4871144,
        name: 'Alperen Sengun',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630578.png',
        lineupWeeks: 15,
        keyPieceWeeks: 14,
        proTeamAbbrev: 'HOU',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg'
      },
      {
        playerId: 4683021,
        name: 'Deni Avdija',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630166.png',
        lineupWeeks: 15,
        keyPieceWeeks: 13,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
      },
      {
        playerId: 3934673,
        name: 'Donte DiVincenzo',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628978.png',
        lineupWeeks: 15,
        keyPieceWeeks: 14,
        proTeamAbbrev: 'MIN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg'
      },
      {
        playerId: 4066457,
        name: 'Austin Reaves',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630559.png',
        lineupWeeks: 12,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'LAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
      },
      {
        playerId: 4066261,
        name: 'Bam Adebayo',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628389.png',
        lineupWeeks: 11,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'MIA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      },
      {
        playerId: 2991070,
        name: 'Jerami Grant',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203924.png',
        lineupWeeks: 11,
        keyPieceWeeks: 7,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
      },
      {
        playerId: 4066354,
        name: 'Payton Pritchard',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630202.png',
        lineupWeeks: 11,
        keyPieceWeeks: 10,
        proTeamAbbrev: 'BOS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg'
      },
      {
        playerId: 4566434,
        name: 'Franz Wagner',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630532.png',
        lineupWeeks: 8,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'ORL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg'
      },
      {
        playerId: 4222252,
        name: 'Isaiah Hartenstein',
        positions: [
          'Center-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628392.png',
        lineupWeeks: 8,
        keyPieceWeeks: 4,
        proTeamAbbrev: 'OKC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg'
      },
      {
        playerId: 4395628,
        name: 'Zion Williamson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629627.png',
        lineupWeeks: 8,
        keyPieceWeeks: 7,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 4395651,
        name: 'Coby White',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629632.png',
        lineupWeeks: 7,
        keyPieceWeeks: 4,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
      },
      {
        playerId: 4431767,
        name: 'Christian Braun',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631128.png',
        lineupWeeks: 6,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 3908809,
        name: 'Donovan Mitchell',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628378.png',
        lineupWeeks: 6,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'CLE',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg'
      },
      {
        playerId: 3102530,
        name: 'Jusuf Nurkic',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203994.png',
        lineupWeeks: 6,
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
        lineupWeeks: 6,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4576087,
        name: 'Peyton Watson',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631212.png',
        lineupWeeks: 6,
        keyPieceWeeks: 5,
        proTeamAbbrev: 'DEN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg'
      },
      {
        playerId: 4397189,
        name: 'Jalen Smith',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630188.png',
        lineupWeeks: 5,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4396907,
        name: 'Darius Garland',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629636.png',
        lineupWeeks: 4,
        keyPieceWeeks: 4,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4997536,
        name: 'Gui Santos',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630611.png',
        lineupWeeks: 4,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 4576060,
        name: 'Ryan Kalkbrenner',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641750.png',
        lineupWeeks: 4,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
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
        playerId: 4903027,
        name: 'Cedric Coward',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642907.png',
        lineupWeeks: 3,
        keyPieceWeeks: 0,
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
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 3155942,
        name: 'Domantas Sabonis',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627734.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4395724,
        name: 'Immanuel Quickley',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630193.png',
        lineupWeeks: 3,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'TOR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg'
      },
      {
        playerId: 4592691,
        name: 'Jake LaRavia',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631222.png',
        lineupWeeks: 3,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'LAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg'
      },
      {
        playerId: 4437244,
        name: 'Jalen Green',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630224.png',
        lineupWeeks: 3,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 3995,
        name: 'Jrue Holiday',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/201950.png',
        lineupWeeks: 3,
        keyPieceWeeks: 3,
        proTeamAbbrev: 'POR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg'
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
        playerId: 4395712,
        name: 'Andrew Nembhard',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629614.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 5104155,
        name: 'Bilal Coulibaly',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641731.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'WAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
      },
      {
        playerId: 4709138,
        name: 'Brandin Podziemski',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641764.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 4397040,
        name: 'Brandon Williams',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630314.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg'
      },
      {
        playerId: 4432174,
        name: 'Cam Thomas',
        positions: [
          '—'
        ],
        headshotUrl: 'https://a.espncdn.com/i/headshots/nba/players/full/4432174.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'FA'
      },
      {
        playerId: 4683692,
        name: 'Cason Wallace',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641717.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'OKC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg'
      },
      {
        playerId: 5093267,
        name: 'Collin Murray-Boyles',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642867.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'TOR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg'
      },
      {
        playerId: 4066436,
        name: 'De\'Anthony Melton',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629001.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 5037871,
        name: 'Dylan Harper',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642844.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 5105550,
        name: 'GG Jackson',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641713.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 5144091,
        name: 'Jeremiah Fears',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642847.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'NOP',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg'
      },
      {
        playerId: 4592479,
        name: 'Julian Champagnie',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630577.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg'
      },
      {
        playerId: 4433627,
        name: 'Keyonte George',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641718.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4711294,
        name: 'Matas Buzelis',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641824.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'CHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg'
      },
      {
        playerId: 4066383,
        name: 'Miles Bridges',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628970.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'CHA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg'
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
        playerId: 4601023,
        name: 'Oso Ighodaro',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642345.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'PHX',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg'
      },
      {
        playerId: 4278078,
        name: 'P.J. Washington',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629023.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg'
      },
      {
        playerId: 4251,
        name: 'Paul George',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/202331.png',
        lineupWeeks: 2,
        keyPieceWeeks: 2,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 4397014,
        name: 'Quentin Grimes',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629656.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 4278580,
        name: 'Sandro Mamukelashvili',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630572.png',
        lineupWeeks: 2,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'TOR',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg'
      },
      {
        playerId: 4065733,
        name: 'Ty Jerome',
        positions: [
          'Guard-Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629660.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 5144126,
        name: 'Will Riley',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642860.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'WAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
      },
      {
        playerId: 4600663,
        name: 'Zach Edey',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641744.png',
        lineupWeeks: 2,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4397183,
        name: 'Aaron Wiggins',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630598.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'OKC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg'
      },
      {
        playerId: 4873138,
        name: 'Ace Bailey',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642846.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 6585,
        name: 'Andre Drummond',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203083.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
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
        playerId: 5105839,
        name: 'Brice Sensabaugh',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641729.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4845374,
        name: 'Bub Carrington',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642267.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'WAS',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
      },
      {
        playerId: 4895758,
        name: 'Cody Williams',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642262.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
      },
      {
        playerId: 4065732,
        name: 'De\'Andre Hunter',
        positions: [
          'Forward-Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629631.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 3936099,
        name: 'Derrick Jones Jr.',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627884.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 4870562,
        name: 'Dominick Barlow',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631230.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'PHI',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg'
      },
      {
        playerId: 6589,
        name: 'Draymond Green',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203110.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 5175643,
        name: 'Egor Demin',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642856.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'BKN',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg'
      },
      {
        playerId: 4397449,
        name: 'Elijah Harkless',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641989.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'UTA',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg'
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
        playerId: 4432810,
        name: 'Isaiah Stewart',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630191.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DET',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg'
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
        playerId: 4781746,
        name: 'Javon Small',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642914.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4065731,
        name: 'Jay Huff',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630643.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 5112087,
        name: 'Jaylen Wells',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642377.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 3146557,
        name: 'Jock Landale',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1629111.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'ATL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
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
        playerId: 3102531,
        name: 'Kristaps Porzingis',
        positions: [
          'Forward-Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/204001.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'GSW',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg'
      },
      {
        playerId: 4277848,
        name: 'Marvin Bagley III',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1628963.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'DAL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg'
      },
      {
        playerId: 4702384,
        name: 'Nique Clifford',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642363.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 4595400,
        name: 'Olivier-Maxence Prosper',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1641765.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MEM',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg'
      },
      {
        playerId: 4997526,
        name: 'Ousmane Dieng',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1631172.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'MIL',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg'
      },
      {
        playerId: 3149673,
        name: 'Pascal Siakam',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1627783.png',
        lineupWeeks: 1,
        keyPieceWeeks: 1,
        proTeamAbbrev: 'IND',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg'
      },
      {
        playerId: 4431679,
        name: 'Precious Achiuwa',
        positions: [
          'Forward'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1630173.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      },
      {
        playerId: 5108024,
        name: 'Yanic Konan Niederhauser',
        positions: [
          'Center'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/1642949.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'LAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg'
      },
      {
        playerId: 3064440,
        name: 'Zach LaVine',
        positions: [
          'Guard'
        ],
        headshotUrl: 'https://cdn.nba.com/headshots/nba/latest/260x190/203897.png',
        lineupWeeks: 1,
        keyPieceWeeks: 0,
        proTeamAbbrev: 'SAC',
        proTeamFromNbaCatalog: true,
        teamLogoUrl: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg'
      }
    ],
    lineupKeyWeeksTeamAvg: 2.4
  }
}

export default data

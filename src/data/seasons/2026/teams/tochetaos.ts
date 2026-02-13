/**
 * Team rewind data – Tochetaos
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'tochetaos',
  displayName: 'Tochetaos',
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
      value: '11-4-0',
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
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '11-4',
          rank: 1
        },
        {
          id: 'beijing-ducks',
          name: '北京首钢霹雳鸭',
          value: '10-5',
          rank: 2
        },
        {
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '10-5',
          rank: 3
        },
        {
          id: 'fiestas-fantastic-team',
          name: 'Fiesta\'s Fantastic Team',
          value: '9-6',
          rank: 4
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
          value: '8-7',
          rank: 5
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
          value: '7-8',
          rank: 6
        },
        {
          id: 'glizzy-goblers',
          name: 'Glizzy Goblers',
          value: '7-8',
          rank: 7
        },
        {
          id: 'metefierros',
          name: 'METEFIERROS',
          value: '6-9',
          rank: 8
        },
        {
          id: 'huecox-y-un-dobel',
          name: 'huecox y un Dobel',
          value: '5-10',
          rank: 9
        },
        {
          id: 'lalocomotora',
          name: 'LaloComotora',
          value: '2-13',
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
      footer: 'Peak momentum'
    },
    {
      type: 'rank',
      title: 'Lose Streaks',
      subtitle: 'Longest losing streak per team',
      metricLabel: 'Losses',
      rows: [
        {
          id: 'huecox-y-un-dobel',
          name: 'huecox y un Dobel',
          value: '6',
          rank: 1
        },
        {
          id: 'lalocomotora',
          name: 'LaloComotora',
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
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '3',
          rank: 6
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
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
                y: 21370.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 19524.0
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
      description: 'Std dev: 299.9',
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
                x: 'huecox y un Dobel',
                y: 208.41011814149044
              },
              {
                x: 'Novigrad 21ers ',
                y: 230.88169995692598
              },
              {
                x: 'LaloComotora',
                y: 232.61650306889234
              },
              {
                x: 'METEFIERROS',
                y: 236.2428487674283
              },
              {
                x: 'LububuMatcha',
                y: 259.93280381667876
              },
              {
                x: 'Diego\'s Daring Team',
                y: 267.5252324548098
              },
              {
                x: 'Glizzy Goblers',
                y: 281.1682936872506
              },
              {
                x: '北京首钢霹雳鸭',
                y: 288.4835350587621
              },
              {
                x: 'Fiesta\'s Fantastic T',
                y: 289.47009101762137
              },
              {
                x: 'Tochetaos',
                y: 299.9295490194322
              }
            ]
          }
        ]
      },
      highlight: {
        label: 'Tochetaos',
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
        name: 'Tochetaos',
        score: 1804
      },
      opp: {
        name: 'Glizzy Goblers',
        score: 1383
      },
      margin: 421,
      note: 'vs Glizzy Goblers',
      footer: 'Worst week: 467 (Week 17)'
    },
    {
      type: 'award',
      title: 'Ceiling Check',
      badgeName: 'Highest scoring week in the league',
      description: 'You had the single highest scoring week with 1804 points.',
      footer: 'Peak performance'
    },
    {
      type: 'rank',
      title: 'Highest Scoring Week (per team)',
      subtitle: 'Ceiling Check goes to #1',
      metricLabel: 'Points',
      rows: [
        {
          id: 'tochetaos',
          name: 'Tochetaos',
          value: '1804',
          rank: 1
        },
        {
          id: 'fiestas-fantastic-team',
          name: 'Fiesta\'s Fantastic Team',
          value: '1761',
          rank: 2
        },
        {
          id: 'beijing-ducks',
          name: '北京首钢霹雳鸭',
          value: '1720',
          rank: 3
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
          value: '1672',
          rank: 4
        },
        {
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '1651',
          rank: 5
        },
        {
          id: 'lububumatcha',
          name: 'LububuMatcha',
          value: '1577',
          rank: 6
        },
        {
          id: 'glizzy-goblers',
          name: 'Glizzy Goblers',
          value: '1568',
          rank: 7
        },
        {
          id: 'metefierros',
          name: 'METEFIERROS',
          value: '1542',
          rank: 8
        },
        {
          id: 'lalocomotora',
          name: 'LaloComotora',
          value: '1474',
          rank: 9
        },
        {
          id: 'huecox-y-un-dobel',
          name: 'huecox y un Dobel',
          value: '1425',
          rank: 10
        }
      ],
      highlightTeamId: 'tochetaos',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '2-1',
      label: 'Record in games ≤100 pts',
      description: '3 total close games',
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
        'Kyle Kuzma',
        'Sandro Mamukelashvili',
        'Marcus Smart'
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
          secondary: '2456 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Amen Thompson',
          secondary: '2011 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Brandon Ingram',
          secondary: '1925 fantasy points',
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
          secondary: 'Rank #2',
          meta: '#2'
        },
        {
          primary: 'AST',
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'STL',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: 'BLK',
          secondary: 'Rank #1',
          meta: '#1'
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
      badgeName: 'The Big Man',
      description: 'Dominancia en REB, BLK y FG%. El cartel de los grandes.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'award',
      title: 'Manager Of The Year',
      badgeName: 'MOTY ',
      description: '25% Stats, 15% Standings before playoffs, 25% League champion, 35% MVA (Roster efficiency + Transaction impact).',
      footer: '25% Stats, 15% Standings, 25% Champion, 35% MVA',
      motyBreakdown: {
        stats: 12.5,
        standings: 15.0,
        champion: 25.0,
        mva: 26.1
      }
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Tochetaos',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

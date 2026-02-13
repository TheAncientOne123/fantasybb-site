/**
 * Team rewind data – Glizzy Goblers
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'glizzy-goblers',
  displayName: 'Glizzy Goblers',
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
      value: '7-8-0',
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
          id: 'novigrad-21ers',
          name: 'Novigrad 21ers ',
          value: '5',
          rank: 3
        },
        {
          id: 'diegos-daring-team',
          name: 'Diego\'s Daring Team',
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
                y: 19558.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 20432.0
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
      value: '#7',
      label: 'Unpredictable',
      description: 'Std dev: 281.2',
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
        label: 'Glizzy Goblers',
        value: '#7'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 15,
      result: 'W',
      me: {
        name: 'Glizzy Goblers',
        score: 1568
      },
      opp: {
        name: 'huecox y un Dobel',
        score: 1425
      },
      margin: 143,
      note: 'vs huecox y un Dobel',
      footer: 'Worst week: 585 (Week 17)'
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
      highlightTeamId: 'glizzy-goblers',
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
        'Davion Mitchell',
        'Reed Sheppard',
        'John Collins',
        'Toumani Camara',
        'Jaylin Williams'
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
          secondary: '2390 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Nickeil Alexander-Walker',
          secondary: '1869 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Evan Mobley',
          secondary: '1756 fantasy points',
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
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Glizzy Goblers',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

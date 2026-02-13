/**
 * Team rewind data – Diego's Daring Team
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'diegos-daring-team',
  displayName: 'Diego\'s Daring Team',
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
      value: '8-7-0',
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
      highlightTeamId: 'diegos-daring-team',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '5W / 5L',
      label: 'Win / Loss',
      description: 'Maximum consecutive',
      footer: 'Momentum swings'
    },
    {
      type: 'award',
      title: 'The Kingslayer',
      badgeName: 'Kingslayer',
      description: 'You ended Tochetaos\'s 10-game win streak in week 15.',
      footer: 'Jaime Lannister would be proud of you'
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
                y: 19400.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 18709.0
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
      value: '#6',
      label: 'Roller Coaster',
      description: 'Std dev: 267.5',
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
        label: 'Diego\'s Daring Team',
        value: '#6'
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
      footer: 'Worst week: 732 (Week 17)'
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
      highlightTeamId: 'diegos-daring-team',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '2-3',
      label: 'Record in games ≤100 pts',
      description: '5 total close games',
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
        'Domantas Sabonis',
        'Russell Westbrook',
        'Ausar Thompson',
        'Jaden McDaniels',
        'Cade Cunningham',
        'Payton Pritchard',
        'Deandre Ayton',
        'Jamal Murray',
        'Jusuf Nurkic',
        'Donte DiVincenzo'
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
          secondary: '2404 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Cade Cunningham',
          secondary: '2403 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Julius Randle',
          secondary: '2272 fantasy points',
          meta: '#3'
        }
      ],
      footer: 'Your fantasy stars'
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
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Diego\'s Daring Team',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

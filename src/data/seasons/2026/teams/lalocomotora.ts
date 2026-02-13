/**
 * Team rewind data – LaloComotora
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'lalocomotora',
  displayName: 'LaloComotora',
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
      value: '2-13-0',
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
      highlightTeamId: 'lalocomotora',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '1W / 6L',
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
      highlightTeamId: 'lalocomotora',
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
      highlightTeamId: 'lalocomotora',
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
                y: 16852.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 20851.0
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
      description: 'Std dev: 232.6',
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
        label: 'LaloComotora',
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
        name: 'LaloComotora',
        score: 1474
      },
      opp: {
        name: 'LububuMatcha',
        score: 1456
      },
      margin: 18,
      note: 'vs LububuMatcha',
      footer: 'Worst week: 480 (Week 17)'
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
      highlightTeamId: 'lalocomotora',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '1-2',
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
        'Pascal Siakam',
        'Paolo Banchero',
        'Mark Williams'
      ],
      lost: [
        'Joel Embiid',
        'Desmond Bane',
        'Dyson Daniels',
        'Trey Murphy III',
        'Kawhi Leonard',
        'Malik Monk',
        'Bennedict Mathurin',
        'Devin Vassell',
        'Jonas Valanciunas'
      ],
      added: [
        'Ajay Mitchell',
        'Kon Knueppel',
        'P.J. Washington',
        'Nic Claxton',
        'Tre Jones',
        'Kyrie Irving',
        'Jaime Jaquez Jr.',
        'James Harden',
        'Grayson Allen',
        'Keyonte George'
      ],
      footer: 'You kept 4/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'James Harden',
          secondary: '2114 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Pascal Siakam',
          secondary: '2012 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Keyonte George',
          secondary: '1920 fantasy points',
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
          primary: 'The Caretaker',
          secondary: '#1 en TO (menos turnovers)'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'LaloComotora',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

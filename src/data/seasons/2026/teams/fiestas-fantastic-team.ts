/**
 * Team rewind data – Fiesta's Fantastic Team
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'fiestas-fantastic-team',
  displayName: 'Fiesta\'s Fantastic Team',
  theme: {
    background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0c4a6e 100%)',
    accent: '#38bdf8',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'Fiesta\'s Fantastic Team',
      footer: 'Fantasy Rewind',
      image: 'https://g.espncdn.com/lm-static/fba/images/default_logos/3.svg'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '9-6-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#4'
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
      highlightTeamId: 'fiestas-fantastic-team',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '4W / 2L',
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
      highlightTeamId: 'fiestas-fantastic-team',
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
      highlightTeamId: 'fiestas-fantastic-team',
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
                y: 20817.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 20482.0
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
      value: '#9',
      label: 'Living on the edge',
      description: 'Std dev: 289.5',
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
        label: 'Fiesta\'s Fantastic Team',
        value: '#9'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 3,
      result: 'W',
      me: {
        name: 'Fiesta\'s Fantastic Team',
        score: 1761
      },
      opp: {
        name: 'Tochetaos',
        score: 1437
      },
      margin: 324,
      note: 'vs Tochetaos',
      footer: 'Worst week: 601 (Week 17)'
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
      highlightTeamId: 'fiestas-fantastic-team',
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
          title: 'vs 北京首钢霹雳鸭',
          detail: '1513–1507 (6 pts)',
          kind: 'win'
        },
        {
          label: 'Week 7',
          title: 'vs huecox y un Dobel',
          detail: '1411–1346 (65 pts)',
          kind: 'win'
        },
        {
          label: 'Week 8',
          title: 'vs Novigrad 21ers ',
          detail: '883–943 (60 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 9',
          title: 'vs Glizzy Goblers',
          detail: '1026–1116 (90 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 10',
          title: 'vs LaloComotora',
          detail: '1445–1420 (25 pts)',
          kind: 'win'
        },
        {
          label: 'Week 11',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1510–1504 (6 pts)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs huecox y un Dobel',
          detail: '1066–1080 (14 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 2,
      result: 'W',
      me: {
        name: 'Fiesta\'s Fantastic Team',
        score: 1513
      },
      opp: {
        name: '北京首钢霹雳鸭',
        score: 1507
      },
      margin: 6,
      note: '6.0-point thriller',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: '北京首钢霹雳鸭',
      label: '2 games',
      description: '6034 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: '北京首钢霹雳鸭',
      events: [
        {
          label: 'Week 2',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1513–1507 (W)',
          kind: 'win'
        },
        {
          label: 'Week 11',
          title: 'vs 北京首钢霹雳鸭',
          detail: '1510–1504 (W)',
          kind: 'win'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 6,
      result: 'L',
      me: {
        name: 'Fiesta\'s Fantastic Team',
        score: 1192
      },
      opp: {
        name: 'LububuMatcha',
        score: 1352
      },
      margin: 160,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Shai Gilgeous-Alexander',
        'Ivica Zubac',
        'Jalen Duren',
        'Lauri Markkanen'
      ],
      lost: [
        'Jalen Williams',
        'Donovan Mitchell',
        'Ja Morant',
        'OG Anunoby',
        'Rudy Gobert',
        'Isaiah Hartenstein',
        'Jaden McDaniels',
        'Jared McCain',
        'Jonathan Kuminga'
      ],
      added: [
        'Desmond Bane',
        'Alex Sarr',
        'Jabari Smith Jr.',
        'CJ McCollum',
        'Norman Powell',
        'Kawhi Leonard',
        'Cason Wallace',
        'Dyson Daniels',
        'Karl-Anthony Towns',
        'Collin Gillespie'
      ],
      footer: 'You kept 4/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Shai Gilgeous-Alexander',
          secondary: '2748 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Kawhi Leonard',
          secondary: '2034 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Karl-Anthony Towns',
          secondary: '1942 fantasy points',
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
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'REB',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: 'STL',
          secondary: 'Rank #3',
          meta: '#3'
        },
        {
          primary: 'FG%',
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
      type: 'list',
      title: 'Category Titles',
      subtitle: 'First place honors',
      items: [
        {
          primary: 'The Sharpshooter',
          secondary: '#1 en FG%'
        },
        {
          primary: 'The Worm',
          secondary: '#1 en REB'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'Fiesta\'s Fantastic Team',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

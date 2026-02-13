/**
 * Team rewind data – huecox y un Dobel
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'huecox-y-un-dobel',
  displayName: 'huecox y un Dobel',
  theme: {
    background: 'linear-gradient(135deg, #831843 0%, #9f1239 50%, #831843 100%)',
    accent: '#f87171',
  },
  slides: [
    {
      type: 'hero',
      title: 'Your 2026 Rewind',
      subtitle: 'huecox y un Dobel',
      footer: 'Fantasy Rewind',
      image: '/team-logos/huecox-y-un-dobel.png'
    },
    {
      type: 'stat',
      title: 'Season Record',
      value: '5-10-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#9'
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
      highlightTeamId: 'huecox-y-un-dobel',
      footer: 'Your position highlighted'
    },
    {
      type: 'stat',
      title: 'Longest Streaks',
      value: '3W / 6L',
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
      highlightTeamId: 'huecox-y-un-dobel',
      footer: 'Unstoppable goes to #1'
    },
    {
      type: 'award',
      title: 'Free Fall',
      badgeName: 'Longest losing streak in the league',
      description: 'Longest losing streak: 6 consecutive losses.',
      footer: 'Rough patch',
      awardTier: 'standoff'
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
                y: 17395.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 19407.0
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
      description: 'Std dev: 208.4',
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
        label: 'huecox y un Dobel',
        value: '#1'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 15,
      result: 'L',
      me: {
        name: 'huecox y un Dobel',
        score: 1425
      },
      opp: {
        name: 'Glizzy Goblers',
        score: 1568
      },
      margin: 143,
      note: 'vs Glizzy Goblers',
      footer: 'Worst week: 638 (Week 8)'
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
      highlightTeamId: 'huecox-y-un-dobel',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '4-2',
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
          label: 'Week 7',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1346–1411 (65 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 11',
          title: 'vs METEFIERROS',
          detail: '1268–1227 (41 pts)',
          kind: 'win'
        },
        {
          label: 'Week 12',
          title: 'vs LububuMatcha',
          detail: '1266–1194 (72 pts)',
          kind: 'win'
        },
        {
          label: 'Week 13',
          title: 'vs LaloComotora',
          detail: '1200–1151 (49 pts)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'vs Fiesta\'s Fantastic Team',
          detail: '1080–1066 (14 pts)',
          kind: 'win'
        },
        {
          label: 'Week 17',
          title: 'vs 北京首钢霹雳鸭',
          detail: '719–733 (14 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'award',
      title: 'The Closer',
      badgeName: 'Most Close Wins',
      description: 'Won 4 close games (≤100 pts margin)',
      footer: 'Clutch performer'
    },
    {
      type: 'timeline',
      title: 'Close Wins',
      subtitle: 'The Closer moments',
      events: [
        {
          label: 'Week 11',
          title: 'Beat METEFIERROS',
          detail: '1268–1227 (41 pts)',
          kind: 'win'
        },
        {
          label: 'Week 12',
          title: 'Beat LububuMatcha',
          detail: '1266–1194 (72 pts)',
          kind: 'win'
        },
        {
          label: 'Week 13',
          title: 'Beat LaloComotora',
          detail: '1200–1151 (49 pts)',
          kind: 'win'
        },
        {
          label: 'Week 16',
          title: 'Beat Fiesta\'s Fantastic Team',
          detail: '1080–1066 (14 pts)',
          kind: 'win'
        }
      ],
      footer: 'Every point counted'
    },
    {
      type: 'matchup',
      title: 'Closest Game',
      week: 16,
      result: 'W',
      me: {
        name: 'huecox y un Dobel',
        score: 1080
      },
      opp: {
        name: 'Fiesta\'s Fantastic Team',
        score: 1066
      },
      margin: 14,
      note: '14.0-point thriller',
      footer: 'Every point mattered'
    },
    {
      type: 'stat',
      title: 'Rival',
      value: 'Glizzy Goblers',
      label: '2 games',
      description: '5536 combined points',
      footer: 'Most competitive matchup'
    },
    {
      type: 'timeline',
      title: 'Games vs Rival',
      subtitle: 'Glizzy Goblers',
      events: [
        {
          label: 'Week 6',
          title: 'vs Glizzy Goblers',
          detail: '1129–1414 (L)',
          kind: 'loss'
        },
        {
          label: 'Week 15',
          title: 'vs Glizzy Goblers',
          detail: '1425–1568 (L)',
          kind: 'loss'
        }
      ],
      footer: 'Green = win, Red = loss'
    },
    {
      type: 'matchup',
      title: 'Nemesis',
      week: 10,
      result: 'L',
      me: {
        name: 'huecox y un Dobel',
        score: 865
      },
      opp: {
        name: 'Diego\'s Daring Team',
        score: 1374
      },
      margin: 509,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Devin Booker',
        'De\'Aaron Fox',
        'Mikal Bridges',
        'Shaedon Sharpe',
        'Aaron Gordon'
      ],
      lost: [
        'Anthony Davis',
        'Nikola Vucevic',
        'Jamal Murray',
        'Zach LaVine',
        'Andrew Wiggins',
        'John Collins',
        'D\'Angelo Russell',
        'T.J. McConnell'
      ],
      added: [
        'Jalen Suggs',
        'Bobby Portis',
        'Myles Turner',
        'Brandin Podziemski',
        'Jarrett Allen',
        'Ayo Dosunmu',
        'Anthony Edwards',
        'LaMelo Ball',
        'Tari Eason'
      ],
      footer: 'You kept 5/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Anthony Edwards',
          secondary: '2154 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Mikal Bridges',
          secondary: '2046 fantasy points',
          meta: '#2'
        },
        {
          primary: 'De\'Aaron Fox',
          secondary: '1707 fantasy points',
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
          primary: 'FT%',
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
      badgeName: 'The Surgeon',
      description: 'Dominancia en FG%, FT% y TO (menos pérdidas). Precisión quirúrgica.',
      footer: 'Season identity',
      awardTier: 'award'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: 'huecox y un Dobel',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

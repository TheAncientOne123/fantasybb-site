/**
 * Team rewind data – 北京首钢霹雳鸭
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'beijing-ducks',
  displayName: '北京首钢霹雳鸭',
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
      value: '10-5-0',
      label: 'W-L-T',
      compareTo: {
        label: 'Standing',
        value: '#2'
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
                y: 22352.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 20194.0
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
      description: 'Std dev: 288.5',
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
        label: '北京首钢霹雳鸭',
        value: '#8'
      },
      footer: 'Your position in the league'
    },
    {
      type: 'matchup',
      title: 'Highest Scoring Week',
      week: 4,
      result: 'W',
      me: {
        name: '北京首钢霹雳鸭',
        score: 1720
      },
      opp: {
        name: 'Tochetaos',
        score: 1618
      },
      margin: 102,
      note: 'vs Tochetaos',
      footer: 'Worst week: 733 (Week 17)'
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
      highlightTeamId: 'beijing-ducks',
      footer: 'Your ceiling rank'
    },
    {
      type: 'stat',
      title: 'Close Games',
      value: '3-3',
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
          detail: '1431–1382 (49 pts)',
          kind: 'win'
        },
        {
          label: 'Week 17',
          title: 'vs huecox y un Dobel',
          detail: '733–719 (14 pts)',
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
      description: '6087 combined points',
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
          detail: '1431–1382 (W)',
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
      footer: 'Everyone had you on their radar'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
      kept: [
        'Nikola Jokic',
        'Jalen Brunson',
        'Kevin Durant',
        'Jalen Johnson',
        'Derrick White',
        'RJ Barrett',
        'Tyler Herro'
      ],
      lost: [
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
        'Andrew Wiggins',
        'Jalen Green',
        'Dillon Brooks',
        'Franz Wagner',
        'Anfernee Simons'
      ],
      footer: 'You kept 7/13 from draft'
    },
    {
      type: 'list',
      title: 'Season MVPs',
      subtitle: 'Top 3 performers',
      items: [
        {
          primary: 'Nikola Jokic',
          secondary: '2624 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Jalen Johnson',
          secondary: '2558 fantasy points',
          meta: '#2'
        },
        {
          primary: 'Trey Murphy III',
          secondary: '2137 fantasy points',
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
          primary: 'AST',
          secondary: 'Rank #1',
          meta: '#1'
        },
        {
          primary: '3PM',
          secondary: 'Rank #1',
          meta: '#1'
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
          primary: 'The Scoring King',
          secondary: '#1 en PTS'
        },
        {
          primary: 'The Cold Blooded',
          secondary: '#1 en FT%'
        },
        {
          primary: 'The Point God',
          secondary: '#1 en AST'
        },
        {
          primary: 'The Splash Father',
          secondary: '#1 en 3PM'
        }
      ],
      footer: 'Your dominance'
    },
    {
      type: 'hero',
      title: 'See you next season',
      subtitle: '北京首钢霹雳鸭',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

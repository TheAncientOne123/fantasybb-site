/**
 * Team rewind data – METEFIERROS
 * Generated from ESPN Fantasy Basketball analytics
 */

import type { TeamRewindData } from '../rewind-types'

const data: TeamRewindData = {
  id: 'metefierros',
  displayName: 'METEFIERROS',
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
      value: '6-9-0',
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
                y: 19087.0
              }
            ],
            color: '#22c55e'
          },
          {
            name: 'Points Against',
            data: [
              {
                x: 'Points Against',
                y: 19835.0
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
      value: '#4',
      label: 'Mostly Reliable',
      description: 'Std dev: 236.2',
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
        label: 'METEFIERROS',
        value: '#4'
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
      footer: 'Worst week: 556 (Week 17)'
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
      type: 'award',
      title: 'The Choke',
      badgeName: 'Most Close Losses',
      description: 'Lost 4 close games (≤100 pts margin)',
      footer: 'So close...',
      awardTier: 'no-award'
    },
    {
      type: 'timeline',
      title: 'Close Losses',
      subtitle: 'The Choke moments',
      events: [
        {
          label: 'Week 4',
          title: 'Lost to Glizzy Goblers',
          detail: '1231–1329 (98 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 6',
          title: 'Lost to 北京首钢霹雳鸭',
          detail: '1135–1193 (58 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 8',
          title: 'Lost to Diego\'s Daring Team',
          detail: '725–786 (61 pts)',
          kind: 'loss'
        },
        {
          label: 'Week 11',
          title: 'Lost to huecox y un Dobel',
          detail: '1227–1268 (41 pts)',
          kind: 'loss'
        }
      ],
      footer: 'Heartbreak'
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
      week: 7,
      result: 'L',
      me: {
        name: 'METEFIERROS',
        score: 1197
      },
      opp: {
        name: 'Tochetaos',
        score: 1496
      },
      margin: 299,
      note: 'Biggest loss',
      footer: 'They got you good'
    },
    {
      type: 'rosterDiff',
      title: 'Roster Evolution',
      draftedCount: 13,
      currentCount: 14,
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
        'Santi Aldama',
        'Andrew Nembhard',
        'Kyshawn George',
        'Joel Embiid',
        'Anthony Black',
        'Jaylon Tyson',
        'Kristaps Porzingis',
        'Derik Queen',
        'Scoot Henderson',
        'Cam Spencer',
        'Royce O\'Neale'
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
          secondary: '2804 fantasy points',
          meta: '#1'
        },
        {
          primary: 'Victor Wembanyama',
          secondary: '2037 fantasy points',
          meta: '#2'
        },
        {
          primary: 'DeMar DeRozan',
          secondary: '1826 fantasy points',
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
          secondary: 'Rank #3',
          meta: '#3'
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
      type: 'hero',
      title: 'See you next season',
      subtitle: 'METEFIERROS',
      footer: 'Fantasy Rewind'
    }
  ],
}

export default data

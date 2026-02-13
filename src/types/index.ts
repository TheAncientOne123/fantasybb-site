// Core Types
export interface User {
  id: string;
  email: string;
  username: string;
  teamId: string;
  leagueId: string;
  createdAt: Date;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  owner: string;
  leagueId: string;
}

export interface League {
  id: string;
  name: string;
  season: string;
  year: number;
}

export interface Player {
  id: string;
  name: string;
  position: string[];
  team: string;
  injuryStatus?: 'healthy' | 'questionable' | 'out' | 'doubtful';
  stats?: PlayerStats;
}

export interface PlayerStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fgPercentage: number;
  ftPercentage: number;
  threes: number;
}

// Matchup Types
export interface Matchup {
  id: string;
  week: number;
  season: string;
  myTeam: Team;
  opponent: Team;
  myScore: number;
  opponentScore: number;
  myProjection: number;
  opponentProjection: number;
  winProbability: number;
  status: 'upcoming' | 'live' | 'completed';
  alerts: Alert[];
}

export interface Alert {
  type: 'injury' | 'dnp' | 'trade' | 'waiver';
  severity: 'low' | 'medium' | 'high';
  message: string;
  playerId?: string;
}

// Metrics Types
export interface Metric {
  id: string;
  name: string;
  value: number;
  percentile: number;
  interpretation: string;
  tooltip?: string;
  trend?: 'up' | 'down' | 'neutral';
  category: MetricCategory;
}

export type MetricCategory = 
  | 'efficiency' 
  | 'consistency' 
  | 'clutch' 
  | 'luck' 
  | 'draft' 
  | 'depth';

// Moves Types
export interface Waiver {
  id: string;
  playerAdded: Player;
  playerDropped?: Player;
  week: number;
  season: string;
  iww?: number; // Ideal Waiver Window
  wia?: number; // Waiver Impact Added
  wer?: number; // Waiver Efficiency Rating
}

export interface Trade {
  id: string;
  week: number;
  season: string;
  teamSent: Team;
  teamReceived: Team;
  playersSent: Player[];
  playersReceived: Player[];
  tnv: number; // Trade Net Value
  tradeWinImpact?: number;
  contextScore?: number;
  oci?: number; // Opportunity Cost Index
  asymmetry?: number;
  regret?: number;
  verdict: 'great' | 'good' | 'neutral' | 'bad' | 'blunder';
}

export interface StreamerRecommendation {
  player: Player;
  score: number;
  reasons: string[];
  type: 'pickup' | 'start' | 'sit' | 'drop';
  matchupContext?: string;
}

// Timeline Types
export interface TimelineEvent {
  id: string;
  type: 'trade' | 'waiver' | 'result' | 'clutch' | 'milestone';
  week: number;
  season: string;
  date: Date;
  teamId?: string;
  description: string;
  impact: number;
  verdict?: 'great' | 'good' | 'neutral' | 'bad' | 'blunder';
  metrics?: Record<string, number>;
  relatedTrade?: Trade;
  relatedWaiver?: Waiver;
}

// Awards Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  metric?: string;
  threshold?: number;
}

export type BadgeCategory = 
  | 'performance' 
  | 'strategy' 
  | 'clutch' 
  | 'luck' 
  | 'identity';

export interface Title {
  id: string;
  name: string;
  season: string;
  teamId: string;
  editable: boolean;
}

export interface Award {
  badge: Badge;
  earned: boolean;
  season?: string;
  dateEarned?: Date;
  metric?: number;
}

// Rewind Types
export interface Rewind {
  season: string;
  teamId: string;
  slides: RewindSlide[];
  shareCard: ShareCard;
}

export interface RewindSlide {
  type: RewindSlideType;
  title: string;
  content: Record<string, any>;
}

export type RewindSlideType = 
  | 'hero'
  | 'expectations'
  | 'identity'
  | 'waivers'
  | 'trades'
  | 'bestWeek'
  | 'worstWeek'
  | 'luck'
  | 'awards'
  | 'gmScore'
  | 'share';

export interface ShareCard {
  season: string;
  teamName: string;
  record: string;
  standing: number;
  powerScore: number;
  title?: string;
  topBadges: Badge[];
  highlight: string;
}

// Identity Types
export interface TeamIdentity {
  efficiency: number;
  consistency: number;
  clutch: number;
  depth: number;
  starDependence: number;
  waiverReliance: number;
  tradeActivity: number;
}

// Season Context
export interface SeasonContext {
  season: string;
  year: number;
  currentWeek: number;
  totalWeeks: number;
}

// UI Component Props Types
export interface MetricTileProps {
  title: string;
  value: number | string;
  percentile?: number;
  interpretation: string;
  tooltip?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export interface MatchupHeroCardProps {
  matchup: Matchup;
  className?: string;
}

export interface PlayerImpactCardProps {
  player: Player;
  impact: number;
  type: 'contributor' | 'liability';
  matchupContext: boolean;
  className?: string;
}

export interface TrendChartCardProps {
  title: string;
  data: DataPoint[];
  type: 'line' | 'bar' | 'scatter';
  comparison?: DataPoint[];
  className?: string;
}

export interface DataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface RadarIdentityCardProps {
  identity: TeamIdentity;
  leagueAverage?: TeamIdentity;
  className?: string;
}

export interface EventTimelineCardProps {
  event: TimelineEvent;
  className?: string;
}

export interface TradeCardProps {
  trade: Trade;
  className?: string;
}

export interface WaiverCardProps {
  waiver: Waiver;
  className?: string;
}

export interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  season?: string;
  metric?: number;
  className?: string;
}

export interface TitleChipProps {
  title: Title;
  editable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export interface ShareCardProps {
  shareCard: ShareCard;
  exportable?: boolean;
  className?: string;
}

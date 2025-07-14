export type ReportCategory = 
  | 'school_route' 
  | 'lighting' 
  | 'traffic' 
  | 'abandoned_building' 
  | 'noise' 
  | 'vandalism' 
  | 'loitering' 
  | 'wild_dumping' 
  | 'other';

export type ReportStatus = 'pending' | 'published' | 'resolved';

export interface Location {
  lat: number;
  lng: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface Votes {
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
}

export interface Report {
  id: string;
  title: string;
  description?: string;
  category: ReportCategory;
  location: Location;
  status: ReportStatus;
  votes: Votes;
  comments: Comment[];
  createdAt: Date;
  userId: string;
  userName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface CreateReportData {
  title: string;
  description?: string;
  category: ReportCategory;
  location: Location;
}
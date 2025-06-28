export type User = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  profileImageUrl: string;
  coverPhotoUrl: string;
};

export type Topic = {
  id: string;
  title: string;
  createdAt: string;
  likes: number;
  comments: number;
  upVotes: number;
  user: User;
};

export type TopicPageData = {
  posts: number;
  followers: number;
  topContributors: User[];
  topics: Topic[];
};

export type Club = {
  id: string;
  clubName: string;
  topicCount: number;
  lastActivity: string;
  description: string;
  logo: string;
  backgroundImage: string;
};

export type League = {
  id: string;
  name: string;
  logo: string;
  description: string;
  clubCount: number;
  lastActivity: string;
  createdAt: string;
  memberCount: number;
  backgroundImage: string;
};

export type LeagueData = {
  leagues: League[];
  status: string;
};

export type ClubPageData = {
  clubs: Club[];
  league: League;
  user: User;
  relatedLeagues: League[];
};

export type LeftSidebarProps = {
  user: User;
};

export type DashboardPageData = {
  posts: number;
  followers: number;
  profileViews: User[];
  topics: Topic[];
};

export type ProfileHeaderProps = { user: User };

export type HeaderProps = { user: User };

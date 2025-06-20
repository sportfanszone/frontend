export type User = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
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
  topContributors: {
    id: string;
    name: string;
    profileImage: string;
  }[];
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
};

export type ClubPageData = {
  clubs: Club[];
  league: League;
  user: User;
  relatedLeagues: League[];
};

import { IconType } from "react-icons";

export type User = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  profileImageUrl: string;
  coverPhotoUrl: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  achievements: Achievement[];
  leaguesYouFollow: League[];
  clubsYouFollow: Club[];
  Followers: User[];
  Following: User[];
};

export type Topic = Post;

export type TopicCardProp = {
  topic: Topic;
};

export type TopicPageData = {
  posts: number;
  followers: number;
  topContributors: User[];
  topics: Topic[];
};

export type Club = {
  id: string;
  name: string;
  topicCount: number;
  lastAccess: string;
  description: string;
  logo: string;
  backgroundImage: string;
  pinned?: boolean;
};

export type League = {
  id: string;
  name: string;
  logo: string;
  description: string;
  clubCount: number;
  lastAccess: string;
  createdAt: string;
  memberCount: number;
  backgroundImage: string;
  pinned?: boolean;
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
  leaguesYouFollow: League[];
  clubsYouFollow: Club[];
};

export type ProfileHeaderProps = { user: User };

export type HeaderProps = { user: User };

export type LeftSidebarLinkProps = {
  href: string;
  text: string;
  isActive: boolean;
  icon: IconType;
};

export type Achievement = {
  name: string;
  image: string;
};

export type AchievementCardProps = {
  achievements: Achievement[];
};

export type Post = {
  id: string;
  title: string;
  content: string;
  images: string[];
  likes: number;
  shares: number;
  commentCount: number;
  link: string;
  user: User;
  createdAt: string;
  likedByUser: boolean;
};

export type BaseComment = {
  id: string;
  replyCount: number;
  likes: number;
  shares: number;
  user: User;
  replyTo: User;
  content?: string;
  imageUrl?: string;
  audioUrl?: string;
  likedByUser: boolean;
};

export type Comment = BaseComment & {
  replies?: BaseComment[];
};

export type CommentType = Comment;

export type TopConversationsData = {
  posts: Post[];
};

export type PostCardProps = Post;

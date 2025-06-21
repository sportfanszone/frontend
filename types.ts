export type User = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
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

export type PageData = {
  posts: number;
  followers: number;
  topContributors: {
    id: number;
    name: string;
    profileImage: string;
  }[];
};

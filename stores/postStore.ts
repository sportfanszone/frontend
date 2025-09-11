import { create } from "zustand";
import { Post } from "@/types";
import clientFetcher from "@/lib/clientFetcher";

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[] | null | undefined) => void;
  addPost: (post: Post | null | undefined) => void;
  fetchNewPosts: (userId: string, since?: string) => Promise<void>;
  fetchMorePosts: (userId: string, page: number) => Promise<boolean>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  setPosts: (posts) => set({ posts: Array.isArray(posts) ? posts : [] }),
  addPost: (post) => {
    if (post && typeof post === "object" && "id" in post) {
      set((state) => ({ posts: [post, ...state.posts] }));
    }
  },
  fetchNewPosts: async (userId, since) => {
    try {
      const url = since
        ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/get_user_posts/${userId}?since=${since}`
        : `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/get_user_posts/${userId}?limit=10`;
      const response: { posts: Post[] } = await clientFetcher(url, "GET");
      const newPosts = Array.isArray(response.posts) ? response.posts : [];
      if (newPosts.length > 0) {
        set((state) => ({
          posts: [...newPosts, ...state.posts],
        }));
      }
    } catch (error) {
      console.error("Failed to fetch new posts:", error);
    }
  },
  fetchMorePosts: async (userId, page) => {
    try {
      const response: { posts: Post[] } = await clientFetcher(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_URL
        }/api/user/get_user_posts/${userId}?offset=${page * 10}&limit=10`,
        "GET"
      );
      const newPosts = Array.isArray(response.posts) ? response.posts : [];
      if (newPosts.length > 0) {
        set((state) => ({
          posts: [...state.posts, ...newPosts],
        }));
      }
      return newPosts.length === 10; // Return true if more posts are available
    } catch (error) {
      console.error("Failed to fetch more posts:", error);
      return false;
    }
    return false;
  },
}));

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Post {
  id?: string;
  title: string;
  description: string;
  created_at?: string;
}

interface PostStore {
  posts: Post[];
  selectedPost: Post | null;
  getPosts: () => Promise<void>;
  getPostById: (id: string) => Promise<Post | undefined>;
  updatePost: (id: string, updatedFields: Partial<Post>) => Promise<void>;
  createPost: (newPost: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const initialState: Pick<PostStore, 'posts' | 'selectedPost'> = {
  posts: [],
  selectedPost: null,
};

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      ...initialState,

      getPosts: async () => {
        try {
          const resp = await fetch('/api/post/getPosts');
          const { data } = await resp.json();

          if (data) {
            set({ posts: data });
          }
        } catch (error) {
          console.error('Error fetching blogs: ', error);
        }
      },

      getPostById: async (id: string) => {
        try {
          const resp = await fetch(`/api/post/getById?id=${id}`, {
            method: 'GET'
          });

          const { post } = await resp.json();

          if (!resp.ok) {
            throw new Error('Failed to fetch post');
          }
          set((state) => ({
            ...state,
            selectedPost: post
          }));
          return post;
        } catch (error) {
          console.error('Error fetching post by ID: ', error);
        }
      },

      updatePost: async (id: string, updatedFields: Partial<Post>) => {
        try {
          const resp = await fetch('/api/post/update', {
            method: 'POST',
            body: JSON.stringify({ id, ...updatedFields })
          });

          if (!resp.ok) {
            throw new Error('Failed to update post');
          }

          const data = await resp.json();

          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id ? { ...post, ...updatedFields } : post
            )
          }));
          return data;
        } catch (error) {
          console.error('Error updating post: ', error);
        }
      },

      createPost: async (newPost: Post) => {
        try {
          const resp = await fetch('/api/post/add', {
            method: 'POST',
            body: JSON.stringify(newPost)
          });

          if (!resp.ok) {
            throw new Error('Failed to create post');
          }

          const data = await resp.json();

          set((state) => ({
            posts: [...state.posts, data]
          }));

          return data;
        } catch (error) {
          console.error('Error creating post: ', error);
        }
      },

      deletePost: async (id: string) => {
        try {
          const resp = await fetch('/api/post/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
          });

          if (!resp.ok) {
            throw new Error('Failed to delete post');
          }

          await resp.json();

          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id)
          }));
        } catch (error) {
          console.error('Error deleting post: ', error);
        }
      }
    }),
    {
      name: 'postStore',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
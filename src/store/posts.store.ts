import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const initialState = {
  posts: [],
  selectedPost: {}
};

export const usePostStore = create(
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

      getPostById: async (id) => {
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

      updatePost: async (id, updatedFields) => {
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

      createPost: async (newPost) => {
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
            posts: [...state.posts, newPost]
          }));

          return data;
        } catch (error) {
          console.error('Error creating post: ', error);
        }
      },

      deletePost: async (id) => {
        try {
          const resp = await fetch('/api/post/delete', {
            method: 'POST',
            body: JSON.stringify({ id })
          });

          if (!resp.ok) {
            throw new Error('Failed to delete post');
          }

          const data = await resp.json();

          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id)
          }));

          return data;
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
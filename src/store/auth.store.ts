import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id?: string;
  email: string;
  name?: string;
  token?: string;
}

interface AuthSession {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  user?: User;
}

interface AuthStore {
  user: User | null;
  session: AuthSession | null;
  signIn: ({ email, password }: { email: string; password: string }) => {
    message?: string;
    error?: { message: string };
  };
  signUp: ({ email, password }: { email: string; password: string }) => {
    message?: string;
    error?: { message: string };
  };
  confirmEmail: ({ email, token }: { email: string; token: string }) => {
    message?: string;
    error?: { message: string };
  };
  signOut: () => Promise<void>;
}

export const initialAuthState: Pick<AuthStore, 'user' | 'session'> = {
  user: null,
  session: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialAuthState,
      
      signIn: async ({ email, password }) => {
        console.log('{ email, password }', { email, password });
        try {
          const resp = await fetch('/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });

          if (!resp.ok) {
            throw new Error('Failed to sign in');
          }

          const { data } = await resp.json();

          set(() => ({
            user: data.user,
            session: data.session,
          }));

          return data;
        } catch (error) {
          console.error('Error signing in: ', error);
          return { error };
        }
      },

      signUp: async ({ email, password }) => {
        try {
          const resp = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });

          if (!resp.ok) {
            throw new Error('Failed to sign up');
          }

          const { data } = await resp.json();

          set(() => ({
            user: data.user,
            session: data.session,
          }));

          return data;
        } catch (error) {
          console.error('Error signing up: ', error);
          return { error };
        }
      },

      confirmEmail: async ({ email, token }) => {
        try {
          const resp = await fetch('/api/auth/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token }),
          });

          if (!resp.ok) {
            throw new Error('Failed to verify email');
          }

          const data = await resp.json();
          console.log(data.message)

          return data;
        } catch (error) {
          console.error('Error verifying email: ', error);
          return { error };
        }
      },

      signOut: async () => {
        try {
          await fetch('/api/auth/signout', { method: 'POST' });

          set(() => ({
            user: null,
            session: null,
          }));
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      },
    }),
    {
      name: 'authStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
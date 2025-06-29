import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '~/server/db';
import { sessions, users } from '~/server/db/schema';

export const lucia = new Lucia(
  new DrizzleSQLiteAdapter(db, sessions, users),
  {
    sessionCookie: {
      attributes: {
        secure: process.env.NODE_ENV === 'production',
      },
    },
    getUserAttributes: (data) => {
      return {
        email: data.email,
      };
    },
  }
);

// Lucia type augmentation
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}

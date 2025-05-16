// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    /** your database ID */
    user: DefaultSession["user"] & { id: string };
  }
  interface User extends DefaultUser {
    id: string; 
  }
}
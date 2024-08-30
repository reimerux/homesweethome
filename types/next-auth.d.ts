import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
      id: string
      email: string
      role: string
  }
    
    interface Session {
      user: User & DefaultSession["user"]
      expires: string
      error: string
    }
  }
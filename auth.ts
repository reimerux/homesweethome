import prisma from "@/prisma/client";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";



const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "Enter your email" },
  },
  async authorize(credentials) {
    const { email } = credentials as any;
    const user = await prisma.user.findFirst({
      where: { email: email }
    })

    if (user) {
      return { role: user.role, email: user.email, id: user.id.toString(), name: user.firstName }
    } else { return null }
  }
})

const config = {
  providers: [credentialsConfig],
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60 // 2 days,  
  },
  theme: {
    logo: "/home-icon-front-side-with-white-background.jpg"
  },
  pages: {
    error: "/error",
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      return baseUrl
    },
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
    authorized: async ({ request, auth }) => {
      const { pathname, basePath } = request.nextUrl;
      // Logged in users are authenticated, otherwise redirect to login page
      const isAdminPage = pathname.includes("/admin")
      if (isAdminPage && auth?.user.role !== "ADMIN") return NextResponse.redirect(new URL('/auth/noAuth', request.url));

      const isEditPage = pathname.includes("/edit") || pathname.includes("/new")
      if (isEditPage && auth?.user.role === "VIEWER") return NextResponse.redirect(new URL('/auth/noAuth', request.url));
      return !!auth
    }
  },
} satisfies NextAuthConfig



export const { handlers, signIn, signOut, auth } = NextAuth(config)


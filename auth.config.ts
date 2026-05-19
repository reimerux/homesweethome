import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  theme: {
    logo: "/home-icon-front-side-with-white-background.jpg",
  },
  pages: {
    error: "/error",
  },
  providers: [],
  callbacks: {
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
    authorized: async ({ request, auth }) => {
      const { pathname } = request.nextUrl;
      const isAdminPage = pathname.includes("/admin");
      if (isAdminPage && auth?.user.role !== "ADMIN")
        return NextResponse.redirect(new URL("/auth/noAuth", request.url));
      const isEditPage =
        pathname.includes("/edit") || pathname.includes("/new");
      if (isEditPage && auth?.user.role === "VIEWER")
        return NextResponse.redirect(new URL("/auth/noAuth", request.url));
      return !!auth;
    },
  },
} satisfies NextAuthConfig;

import prisma from "@/prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "Enter your email" },
  },
  async authorize(credentials) {
    const { email } = credentials as any;
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (user) {
      return {
        role: user.role,
        email: user.email,
        id: user.id.toString(),
        name: user.firstName,
      };
    } else {
      return null;
    }
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [credentialsConfig],
});

import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60 // 2 days,  
    },
    theme: {
        logo: "/home-icon-front-side-with-white-background.jpg"
    },
    callbacks:
    {
        async jwt({token, account}) {
          if (account) {
            token.id = account.providerAccountId
            token.accessToken = account.access_token
          }
          return token
        },
        async session({session, token}) {
          // console.log('token', token);
          session.user.userId = token.id;
          session.user.accessToken = token.accessToken;
          return session
        },
        async redirect({url, baseUrl}) {
          console.log('url', url);
          console.log('baseUrl', baseUrl);
          
          return url.startsWith(baseUrl) ? url : baseUrl + '/';
        }
    }
    ,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "your Email",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                const user = await prisma.user.findFirst({
                    where: { email: email }
                })

                if (user) {
                    return user
                } else { return null }
            }
        })
    ]
}
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db/db";
import authConfig from "./auth.config";
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  // do this after login  and signup setup
  callbacks: {
    async session({ session,token }) {
        if(session.user && token.sub){
            session.user.id = token.sub;
        }
      return session;
    },

    async jwt({ token ,user}) {
        // console.log({token});
        
        
      return token;
    },
  },
});

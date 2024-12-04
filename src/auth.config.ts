
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/schema/index";
import { getUserByEmail } from "@/lib/getUser";
import { isMatch } from "./lib/passwordcheck";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const validate = LoginSchema.safeParse(credentials);
          if (validate.success) {
            const { email, password } = validate.data;
            const user = await getUserByEmail(email);
            if (!user) return null;

            const checkPassword = await isMatch(password, user.hashPassword);
            if (!checkPassword) return null;
            return user;
          }
          return null;
        } catch (error) {
          throw new Error("Internal server error");
        }

        // console.log(cr);
      },
    }),
  ],
} satisfies NextAuthConfig;

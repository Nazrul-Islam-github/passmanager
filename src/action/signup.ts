"use server";
import { z } from "zod";
import { RegisterSchema } from "@/schema/index";
import { getUserByEmail } from "@/lib/getUser";
import bcryptjs from "bcryptjs";
import db from "@/db/db";
export const Signup = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const parse = RegisterSchema.safeParse(data);
    if(parse.error){
        return { error: true, message: parse.error.message };
    }
    const { email, confirmPassword, name, password } = data;
    if (confirmPassword != password) {
      return { error: true, message: "Password not match" };
    }

    const isEmailExist = await getUserByEmail(email);
    if (isEmailExist) {
      return { error: true, message: "Email already in use" };
    }

    // hash the password

    const hashPassword = await bcryptjs.hash(password, 12);

    await db.user.create({
      data: {
        email,
        name,
        hashPassword,
      },
    });

    return { error: false, message: "User Created" };
  } catch (error) {
    
    return { error: true, message: "internal server error" };
  }
};

"use server";
import { z } from "zod";
import { LoginSchema } from "@/schema";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const Login = async (data: z.infer<typeof LoginSchema>) => {
  try {
    const validateInput = LoginSchema.safeParse(data);
    if (!validateInput.success) {
      return { error: true, message: "Invalid feild" };
    }
    const { email, password } = data;
    await signIn("credentials", {
      email: email,
      password: password,
   redirect:false
    });

    return { success: true, message: "login successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, message: "invalid credentials" };
        default:
          return { message: "somthings went wrong", error: true };
      }
    }

    throw error;
  }
};

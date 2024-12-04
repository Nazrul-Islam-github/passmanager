"use server";
import db from "@/db/db";


export async function getUserByEmail(email: string) {
  try {
    const user = db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

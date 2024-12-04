"use server"
import { auth } from "@/auth"
export async function getSession(){
const session = await auth();
if(session?.user) return session.user;
return null
}
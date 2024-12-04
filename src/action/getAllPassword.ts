"use server"
import { revalidatePath } from "next/cache";
import { getSession } from "./getSession";
import db from "@/db/db"
export async function getAllPassword(query:string){
    try {
        const session = await getSession()
        if(!session) return null;
    
        const {id} = session;
    
        const passwords = await db.storePassword.findMany({
            where:{
               userId : id,
            AND:{
                websitename:{
                    contains:query
                }
            }
               
            },
        
            orderBy:{
                createAt:"desc"
            }
        });
    
        // revalidatePath("/dashbrd")
        return passwords 
    } catch (error) {
        console.log(error)
        return null
    }
  
    
}
import bcryptjs from "bcryptjs"

export const isMatch =async (plainpass:string, hashpass:string)=>{
    const passwordCheck = bcryptjs.compare(plainpass, hashpass);
    return passwordCheck
}
"use server";
import { z } from "zod";
import { PasswordSchema } from "@/schema";
import { cryptr } from "@/lib/encryptPass";
import Db from "@/db/db";
import { getSession } from "@/action/getSession";
import { revalidatePath } from "next/cache";
export async function save_password(data: z.infer<typeof PasswordSchema>) {
  try {
    const validatedInput = PasswordSchema.safeParse(data);
    if (!validatedInput.success) {
      return { error: true, message: "Invalid Feild" };
    }

    const { password, username, websitename, url } = data;

    const encryptPass = cryptr.encrypt(password);
    const session = await getSession();
    if (!session) {
      return { error: true, message: "bad request" };
    }

    // save password
    await Db.storePassword.create({
      data: {
        username: username,
        userpassword: encryptPass,
        url: url || null,
        websitename: websitename,
        User: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    revalidatePath("/dashboard");

    return { error: false, message: "Password has been save successully!" };
  } catch (error) {
    console.log(error);
  }
}

//

export async function edit_pass(
  data: z.infer<typeof PasswordSchema>,
  id: string
) {
  const validatedInput = PasswordSchema.safeParse(data);
  if (!validatedInput.success) {
    return { error: true, message: "Invalid Feild" };
  }

  const { password, username, websitename, url } = data;
try {
  const encryptPass = cryptr.encrypt(password);
  const isPasswordExist = await Db.storePassword.findUnique({ where: { id } });
  if (!isPasswordExist) {
    return { error: true, message: "Password not found" };
  }
  await Db.storePassword.update({
    where: { id: id },
    data: {
      url,
      websitename,
      userpassword: encryptPass,
      username,
    },
  });
  revalidatePath("/dashboard")
  return { error: false, message: "password update successfully" };
} catch (error) {
  console.log(error);
  return {error:true,message:"somthing went wrong!"}
}

}

export async function del_pass(id: string) {
  try {
    if (!id) {
      return { error: true, message: "Bad Request!" };
    }

    await Db.storePassword.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");

    return { error: false, message: "Password Deleted!!" };
  } catch (error) {
    console.log(error);
    return;
  }
}

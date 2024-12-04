"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {DialogClose} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormError } from "./authcomponents/form-error";
import { LoadPasswordProps } from "./load-password";

import { edit_pass } from "@/action/password-action";
const EditForm = (props: LoadPasswordProps) => {
  const [showPass, setShowPass] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    try {
      const res = await edit_pass(data, props.id);
      if (res?.error) {
        setFormError(res.message);
        form.reset();
        
      } else {
        toast({ title: res?.message, style: { color: "green" } });
        form.reset();
        const clo = document.getElementById("close")
        clo?.click()
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [formerror, setFormError] = useState("");
  const form = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      username: props.username || "",
      password: props.userpassword || "",
      websitename: props.websitename || "",
      url: props.url || "",
    },
  });

  const togale = () => {
    setShowPass(!showPass);
  };
  return (
    <Form {...form}>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="username" className="text-right">
                User Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter user name"
                  className="col-span-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="password" className="text-right">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  placeholder="enter user password"
                  className="col-span-2"
                  type={showPass ? "password" : "text"}
                  name="password"
                />
              </FormControl>
              <Button variant="ghost" type="button" onClick={togale}>
                {showPass ? <EyeIcon /> : <EyeOff />}
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="url" className="text-right">
                URL <span>(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter site url"
                  className="col-span-2"
                  name="url"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websitename"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="websitename" className="text-right">
                Website Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter websitename"
                  className="col-span-2"
                  name="websitename"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={formerror} />
        <DialogClose asChild>
          
          <Button id="close" className="hidden">Close</Button>
        </DialogClose>
        <Button type="submit">Edit Password</Button>
      </form>
    </Form>
  );
};

export default EditForm;

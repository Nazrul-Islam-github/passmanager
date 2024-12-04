"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { PasswordSchema } from "@/schema";
import { save_password } from "@/action/password-action";
import {FormError} from "@/components/authcomponents/form-error";

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

export function DialogDemo() {
  const [showPass, setShowPass] = useState(false);
  const [formerror,setFormError] = useState("")
  const {toast} = useToast()
  const togale = () => {
    setShowPass(!showPass);
  };

  const form = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      username: "",
      password: "",
      websitename: "",
      url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    try{
      const res = await save_password(data);
     if(res?.error){
      setFormError(res.message)
      form.reset()
     }
     else{
      toast({title:res?.message,style:{color:"green"}})
      form.reset()
     }
      
    }catch(err){
      console.log(err);
      
      form.reset()
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12">
          {" "}
          <Plus />
          Add New Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:min-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
          <DialogDescription>
            Enter the necessary information to create a new password and save.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
            <FormError message={formerror}/>
            <DialogFooter>
              <Button type="submit">Save Password</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

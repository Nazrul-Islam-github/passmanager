"use client";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import {Signup} from "@/action/signup"
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [formsuccess,setFormsuccess] = useState("")
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit =async  (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    const res = await Signup(data);
    setErrorMessage("");
    setFormsuccess("")
    if(res?.error){
      setErrorMessage(res?.message)
      setLoading(false)
      return
    }
    
    else{
setFormsuccess("User Created")
setLoading(false)
    }

    // console.log(data);
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage}/>
          <FormSuccess message={formsuccess}/>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
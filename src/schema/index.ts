import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    name: z.string().min(1, {
        message: "Please enter your name"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(1, {
        message: "Password is required"
})
});

export const PasswordSchema = z.object({
    username: z.string().min(1,{
        message:"User is name Require"
    }),

    password:z.string().min(1,{
        message:"minimin password length is 8"
    }),

    url : z.string().optional(),
    websitename : z.string().min(1,{
        message:"Website name is required"
    })



})
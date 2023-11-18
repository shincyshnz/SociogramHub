import {z} from "zod";

export const signUpValidation = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    fullname: z.string().min(1, { message: "Firstname is required" }),
    username: z.string().min(2, { message: "Username must be of more than 2 characters" }).max(50, { message: "Username must be less than 50 characters" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
});
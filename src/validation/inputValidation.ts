import { z } from "zod";

//  validation schema
export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
});

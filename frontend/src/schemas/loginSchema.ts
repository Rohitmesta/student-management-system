import { z } from "zod";


export const loginSchema = z.object({

    username: z
        .string()
        .min(3, "Username required"),


    password: z
        .string()
        .min(3, "Password required")

});


export type LoginForm =
    z.infer<typeof loginSchema>;
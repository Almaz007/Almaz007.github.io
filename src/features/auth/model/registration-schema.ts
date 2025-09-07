import { z } from "zod";

export const registrationSchema = z
    .object({
        userName: z
            .string()
            .min(6, {
                message: "должно быть не менее 6 символов.",
            })
            .max(20, {
                message: "должно быть не более 20 символов.",
            }),
        password: z.string().min(4, {
            message: "должно быть не менее 4 символов.",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "пароли не совпадают",
        path: ["confirmPassword"],
    });

export type registrationSchemaType = z.infer<typeof registrationSchema>;

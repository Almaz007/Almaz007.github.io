import { z } from "zod";

export const loginSchema = z.object({
    userName: z.string().nonempty({
        message: "пустая строка",
    }),
    password: z.string().nonempty({
        message: "пустая строка",
    }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

import { Content } from 'next/font/google';
import {z} from 'zod';

export const MessageSchema = z.object({
    content: z 
        .string()
        .min(5, {message: "Content must be at least of 5 characters"})
        .max(250, {message: "Content must not be longer than 250 characters"})
})
import { message } from "sveltekit-superforms/server";
import { any, string, z } from "zod"

export const imageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif'
];

export const logschema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "This is not an Email" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be 8 chars or above" })
        .trim()
})

export const regschema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(5, { message: "Username must be 5 chars or above" })
        .max(16, { message: "Username must be 16 chars or less" })
        .trim(),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "This is not an Email" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be 8 chars or above" })
        .trim(),
    passwordConfirm: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be 8 chars or above" })
        .trim(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
})

export const msgschema = z.object({
    text: z
        .string({ required_error: "Write something first" })
        .max(100, { message: "Message too large" })
        .trim(),
    user: z.string(),
})

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const avatarValidation = z
    .instanceof(File)
    .superRefine((val, ctx) => {
        if (val) {
            if (val.size > MAX_FILE_SIZE) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Avatar must be below 2.5MB'
                });
            }

            if (!imageTypes.includes(val.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Unsupported file type. Supported formats: jpeg, jpg, png, web, svg, gif'"
                });
            }
        } else {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'You must enter an image'
            });
        }
    })

export const ChangeEmSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "This is not an Email" }),
})

export const ChangeUnShema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(5, { message: "Username must be 5 chars or above" })
        .max(16, { message: "Username must be 16 chars or less" })
        .trim(),
})

export const ChangePassSchema = z.object({
    oldPassword: z.string({ required_error: "Password is required" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be 8 chars or above" })
        .trim(),
    passwordConfirm: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be 8 chars or above" })
        .trim(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["newpasswordConfirm"],
})

export const EmailValid = z
    .string({ required_error: "Email is required" })
    .email({ message: "This is not an Email" })

const MAX_FILES_SIZE = 20 * 1024 * 1024;

export const PostSchema = z.object({
    subject: z
        .string({ required_error: "Subject is required" })
        .min(5)
        .max(30),
    Text: z
        .string({ required_error: "Text is required" })
        .min(5),
    tags: z
        .string()
        .array()
        .optional(),
})
import z from "zod";

export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    type: z.enum(["admin", "user"])
});
export const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const UpdateMetadataSchema = z.object({
    avatarId : z.string()
}
);
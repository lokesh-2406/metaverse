import z from "zod";

export const SigninSchema = z.object({
    username: z.string(),
    password: z.string(),
});
export const SignupSchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.enum(["admin", "user"]),
});

export const UpdateMetadataSchema = z.object({
    avatarId: z.string(),
});
export const CreateSpaceSchema = z.object({
    name: z.string(),
    dimension: z
        .string()
        .regex(
            /^\d{1,4}x\d{1,4}$/,
            "Dimension must be in the format WxH (e.g., 1920x1080)"
        ),
    mapId: z.string(),
});

export const AddElementSchema = z.object({
    spaceId: z.string(),
    elementId: z.string(),
    x: z.number(),
    y: z.number(),
});
export const CreateElementSchema = z.object({
    imageUrl: z.string(),
    width: z.number(),
    height: z.number(),
    static: z.boolean(),
});

export const UpdateElementSchema = z.object({
    imageUrl: z.string(),
});

export const CreateAvatarSchema = z.object({
    name: z.string().min(1),
    imageUrl: z.string(),
});
export const CreateMapSchema = z.object({
    thumbnail: z.string(),
    dimension: z
        .string()
        .regex(
            /^\d{1,4}x\d{1,4}$/,
            "Dimension must be in the format WxH (e.g., 1920x1080)"
        ),
    defaultElements: z.array(
        z.object({
            elementId: z.string(),
            x: z.number(),
            y: z.number(),
        })
    ),
});

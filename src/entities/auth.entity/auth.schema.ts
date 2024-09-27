import { z } from "zod";

const AuthSchema = z.object({
	id: z.string().uuid(),
	username: z.string().min(5).max(36),
	password: z.string().min(8).max(60),
	emailAddress: z.string().email().max(320),
});

export const AuthEntitySchema = z.object({
	id: z.string().uuid(),
	username: z.string().min(5).max(36),
	password: z.string().min(8).max(60),
	email_address: z.string().email().max(320),
});

export const AuthDTOSchema = z.object({
	username: z.string().min(5).max(36),
	emailAddress: z.string().email().max(320),
});

export const AuthCreationSchema = AuthSchema.pick({
	username: true,
	password: true,
	emailAddress: true,
});

export const AuthLoginByNameSchema = AuthCreationSchema.omit({
	emailAddress: true,
});

export const AuthLoginByEmailSchema = AuthCreationSchema.omit({
	username: true,
});

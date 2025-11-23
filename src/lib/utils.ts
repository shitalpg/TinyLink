import { z } from 'zod';

export const linkSchema = z.object({
  url: z.string().url(),
  code: z.string().regex(/^[A-Za-z0-9]{6,8}$/).optional(),
});

export function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

'use server';

import { z } from 'zod';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import {
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
} from '../../../lib/constants';

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    email: z.string().email().trim(),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(NAME_MIN_LENGTH, NAME_MIN_LENGTH_ERROR),
    password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'This email is already taken',
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        path: ['username'],
        message: 'This username is already taken',
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: 'Both passwords should be the same',
    path: ['confirmPassword'],
  });

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);

    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);

    const session = await getSession();

    session.id = user.id;
    await session.save();
    redirect('/');
  }
}

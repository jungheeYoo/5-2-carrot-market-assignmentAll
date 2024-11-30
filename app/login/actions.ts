'use server';

import { z } from 'zod';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import {
  EMAIL_DOMAIN_VALIDATION_MESSAGE,
  EMAIL_EXISTS_ERROR,
} from '../../lib/constants';

const checkEmail = (email: string) => email.includes('@zod.com');
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine(checkEmail, EMAIL_DOMAIN_VALIDATION_MESSAGE)
    .refine(checkEmailExists, EMAIL_EXISTS_ERROR),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx'
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['Wrong password!'],
          email: [],
        },
      };
    }
  }
}

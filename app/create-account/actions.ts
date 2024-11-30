'use server';

import { z } from 'zod';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import {
  EMAIL_DOMAIN_VALIDATION_MESSAGE,
  NAME_CHECK_ERROR,
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR,
  PASSWORD_CONFIRM_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '../../lib/constants';

const checkEmail = (email: string) => email.includes('@zod.com');
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
    },
  });
  console.log(user);
  return !Boolean(user);
};

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .trim()
      .refine(checkEmail, EMAIL_DOMAIN_VALIDATION_MESSAGE)
      .refine(
        checkUniqueEmail,
        'This email is already registered with an account.'
      ),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(NAME_MIN_LENGTH, NAME_MIN_LENGTH_ERROR)
      .refine(checkUniqueUsername, NAME_CHECK_ERROR),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: PASSWORD_CONFIRM_ERROR,
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
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
    redirect('/profile');
  }
}

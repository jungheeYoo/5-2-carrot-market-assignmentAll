'use server';

import { z } from 'zod';
import {
  EMAIL_DOMAIN_VALIDATION_MESSAGE,
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '../lib/constants';

const checkEmail = (email: string) => email.includes('@zod.com');

const formSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine(checkEmail, EMAIL_DOMAIN_VALIDATION_MESSAGE),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(NAME_MIN_LENGTH, NAME_MIN_LENGTH_ERROR),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const result = formSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}

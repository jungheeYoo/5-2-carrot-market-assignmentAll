'use server';

import {
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
} from '@/lib/constants';
import { z } from 'zod';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const editProfileSchema = z
  .object({
    email: z.string().email().trim(),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(NAME_MIN_LENGTH, NAME_MIN_LENGTH_ERROR),
    password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
    new_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
    bio: z.string().trim().max(100, 'Bio must be 100 characters or less'),
  })
  .superRefine(async (data, ctx) => {
    const { email, username, password, new_password } = data;
    const session = await getSession();

    // 현재 사용자와 같은 이메일/username인 경우는 허용
    const currentUser = await db.user.findUnique({
      where: { id: session.id },
      select: {
        email: true,
        username: true,
        password: true,
      },
    });

    if (!currentUser) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Current user not found',
      });
      return z.NEVER;
    }

    // 이메일이 변경되었고 다른 사용자가 사용 중인 경우만 체크
    if (email !== currentUser.email) {
      const emailExists = await db.user.findFirst({
        where: {
          email,
          id: { not: session.id },
        },
      });

      if (emailExists) {
        ctx.addIssue({
          code: 'custom',
          path: ['email'],
          message: 'This email is already taken',
        });
      }
    }

    // username이 변경되었고 다른 사용자가 사용 중인 경우만 체크
    if (username !== currentUser.username) {
      const usernameExists = await db.user.findFirst({
        where: {
          username,
          id: { not: session.id },
        },
      });

      if (usernameExists) {
        ctx.addIssue({
          code: 'custom',
          path: ['username'],
          message: 'This username is already taken',
        });
      }
    }

    if (!currentUser?.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Current user password not found',
      });
      return z.NEVER;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isPasswordValid) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Current password is incorrect',
      });
      return z.NEVER;
    }

    // new_password 검증 추가
    if (password === new_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['new_password'],
        message: 'New password must not be the same as the current password',
      });
    }
  });

export async function editProfile(_: unknown, formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    new_password: formData.get('newPassword') as string,
    bio: formData.get('bio') as string,
  };

  const session = await getSession();
  const result = await editProfileSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hashedNewPassword = await bcrypt.hash(result.data.new_password, 12);

  const user = await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      email: result.data.email,
      username: result.data.username,
      password: hashedNewPassword,
      bio: result.data.bio,
    },
  });

  return redirect(`/users/${user.username}`);
}

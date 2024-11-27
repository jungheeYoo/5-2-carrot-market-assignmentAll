'use server';

import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(10),
  password: z.string().min(10),
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

'use server';

export async function handleForm(
  prevState: { errors: string[]; success: boolean },
  formData: FormData
) {
  return {
    errors: [],
    success: true,
  };
}

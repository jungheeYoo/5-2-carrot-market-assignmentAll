'use server';

export async function handleForm(
  prevState: { errors: string[]; success: boolean },
  formData: FormData
) {
  const password = formData.get('password');
  console.log(
    formData.get('email'),
    formData.get('username'),
    formData.get('password')
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('logged in!');

  if (password !== '12345') {
    return {
      errors: ['Wrong password 😥. Please try again!'],
      success: false,
    };
  } else {
    return {
      errors: [],
      success: true,
    };
  }
}

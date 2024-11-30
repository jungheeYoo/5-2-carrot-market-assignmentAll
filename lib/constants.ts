// EMAIL
export const EMAIL_DOMAIN_VALIDATION_MESSAGE =
  'Only @zod.com emails are allowed';
export const EMAIL_EXISTS_ERROR = 'There is no user with that email.';

// NAME
export const NAME_MIN_LENGTH = 5;
export const NAME_MIN_LENGTH_ERROR =
  'Username should be at least 5 characters long.';
export const NAME_CHECK_ERROR = 'This username already exists.';

// PASSWORD
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MIN_LENGTH_ERROR =
  'Password should be at least 10 characters long.';
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*\d).+$/);
export const PASSWORD_REGEX_ERROR =
  'Password should contain at least one number (0123456789).';
export const PASSWORD_CONFIRM_ERROR =
  'Please ensure both passwords are the same.';

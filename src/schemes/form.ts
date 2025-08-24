import z from 'zod';

export const form = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-ZА-Я]/, 'The name must begin with a capital letter.'),
    age: z.coerce
      .number<number>('The value must be a number and > 0')
      .positive('The value must be a number and > 0'),
    email: z.email(
      'Email address must be properly formatted (user@example.com)'
    ),
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter (A-Z)')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter (a-z)')
      .regex(/[0-9]/, 'Password must contain at least 1 digit (0-9)')
      .regex(
        /[!@#$%^&*]/,
        'Password must contain at least 1 special character (!@#$%^&*)'
      ),
    passwordRepeat: z.string().min(1, 'Repeat the password'),
    gender: z.enum(['Male', 'Female', 'Dragon King']),
    checked: z.literal(true, 'The conditions must be accepted'),
    country: z.string().min(1, 'Select a country'),
    image: z
      .file()
      .max(1_000_000, 'The file size exceeds 1 MB')
      .mime(
        ['image/png', 'image/jpeg'],
        'Invalid format (only png and jpeg formats are available)'
      ),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Passwords must match',
    path: ['passwordRepeat'],
    when() {
      return true;
    },
  });

export type Form = z.infer<typeof form>;

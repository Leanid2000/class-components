import type { Form } from '../schemes/form';

export type Id =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'passwordRepeat'
  | 'gender'
  | 'checked'
  | 'country'
  | 'image';

export type StoreForm = Omit<Form, 'image'> & {
  image: string;
};

export interface GuestBookPostForm {
  id?: string;
  name: string;
  password: string;
  content: string;
}

export type GuestBookPost = Omit<GuestBookPostForm, 'password'>;

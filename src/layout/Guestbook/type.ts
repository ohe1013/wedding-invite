export interface GuestBookPostForm {
  name: string;
  password: string;
  content: string;
}

export type GuestBookPost = Omit<GuestBookPostForm, 'password'>;

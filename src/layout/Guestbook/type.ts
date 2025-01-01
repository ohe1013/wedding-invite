export interface GuestBookPostForm {
  id?: string;
  name: string;
  password: string;
  content: string;
  timestamp: number;
}

export type GuestBookPost = Omit<GuestBookPostForm, 'password'>;

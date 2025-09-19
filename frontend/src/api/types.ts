export interface FullUser {
  id: number;
  email: string;
  name?: string;
  password?: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
}

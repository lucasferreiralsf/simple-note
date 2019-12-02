import { ValueJSON, ValueProperties } from 'slate';

export interface PagedResponse<R> {
  total?: number;
  data?: R[];
  currentPage?: number;
  totalPages?: number;
}
export interface INote {
  id?: number;
  title?: string;
  user?: string;
  tags?: any[];
  createdAt?: string;
  updatedAt?: string;
  content?: ValueJSON | ValueProperties;
}

export interface IUserLoggedIn {
  userId: string;
  token: string;
  userEmail: string;
  firstName: string;
  lastName: string;
}

export interface IUserRegistered {
  updatedAt: string;
  email: string;
  tags: any[];
  emailToken: string;
  lastName: string;
  firstName: string;
  id: string;
  createdAt: string;
  notes: any[];
  emailIsVerified: false;
  googleId: string;
}

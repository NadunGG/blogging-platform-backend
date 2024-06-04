export interface UserKey {
  id: string;
}

export interface User extends UserKey {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

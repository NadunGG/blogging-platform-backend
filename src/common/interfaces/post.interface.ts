export interface PostKey {
  id: string;
}

export interface Post extends PostKey {
  userId: string;
  title: string;
  body: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

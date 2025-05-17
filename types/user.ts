export type User = {
  id: string;
  username: string;
  email: string;
  imageUrl?: string;
  bio?: string;
  role: "BASIC" | "ADMIN";
  createdAt?: string; // if you include timestamps in your API
  updatedAt?: string;
};
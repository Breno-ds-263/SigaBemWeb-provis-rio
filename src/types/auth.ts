export type LoginResponse = {
  token: string;
};

export type User = {
  autenticated?: boolean;
  id: string;
  name: string;
  email: string;
};

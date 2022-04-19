export interface AuthResponseData {
  authToken: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

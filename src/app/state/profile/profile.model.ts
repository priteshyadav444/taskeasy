export interface UserInfo {
  firstname: string;
  lastname: string | undefined;
  email: string | undefined;
  country: string | undefined;
  phone_no: string | undefined;
  imgurl: string | undefined;
}

export interface UserPassword {
  password: string;
  new_password: string;
  confirm_password: string;
}
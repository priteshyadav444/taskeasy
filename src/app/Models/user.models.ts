export class User {
  constructor(
    private authToken: string,
    private userId: string,
    private firstname :string,
    private lastname :string,
    private email: string,
  ) {}



  get userToken() {
    return this.authToken;
  }
}

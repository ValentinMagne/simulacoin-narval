export class Config {
  public authUrl: string;
  public userUrl: string;

  constructor(authUrl: string, userUrl: string) {
    this.authUrl = authUrl;
    this.userUrl = userUrl;
  }
}

export class Config {
  public authUrl: string;
  public bitcoinUrl: string;
  public userUrl: string;

  constructor(authUrl: string, bitcoinUrl: string, userUrl: string) {
    this.authUrl = authUrl;
    this.bitcoinUrl = bitcoinUrl;
    this.userUrl = userUrl;
  }
}

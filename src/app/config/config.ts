export class Config {
  public authUrl: string;
  public bitcoinUrl: string;
  public buyUrl: string;
  public userUrl: string;

  constructor(authUrl: string, bitcoinUrl: string, buyUrl: string, userUrl: string) {
    this.authUrl = authUrl;
    this.bitcoinUrl = bitcoinUrl;
    this.buyUrl = buyUrl;
    this.userUrl = userUrl;
  }
}

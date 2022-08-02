export class SellBitcoin {
  static readonly type = '[User] Sell BTC';

  constructor(public transactionId: number) {
  }
}

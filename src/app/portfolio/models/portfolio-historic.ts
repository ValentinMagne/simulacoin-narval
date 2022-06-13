export class PortfolioHistoric {
  private _profitAndLoss: number;

  constructor(profitAndLoss: number) {
    this._profitAndLoss = profitAndLoss;
  }

  get profitAndLoss(): number {
    return this._profitAndLoss;
  }

  set profitAndLoss(value: number) {
    this._profitAndLoss = value;
  }
}

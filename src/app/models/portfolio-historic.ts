export class PortfolioHistoric {
  private _invested: number;
  private _profitAndLoss: number;

  constructor(invested: number, profitAndLoss: number) {
    this._invested = invested;
    this._profitAndLoss = profitAndLoss;
  }

  get invested(): number {
    return this._invested;
  }

  set invested(value: number) {
    this._invested = value;
  }

  get profitAndLoss(): number {
    return this._profitAndLoss;
  }

  set profitAndLoss(value: number) {
    this._profitAndLoss = value;
  }
}

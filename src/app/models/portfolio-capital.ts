export class PortfolioCapital {
  private _available: number;
  private _invested: number;
  private _profitAndLoss: number;
  private _capital: number;

  constructor(available: number, invested: number, profitAndLoss: number, capital: number) {
    this._available = available;
    this._invested = invested;
    this._profitAndLoss = profitAndLoss;
    this._capital = capital;
  }

  get available(): number {
    return this._available;
  }

  set available(value: number) {
    this._available = value;
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

  get capital(): number {
    return this._capital;
  }

  set capital(value: number) {
    this._capital = value;
  }
}

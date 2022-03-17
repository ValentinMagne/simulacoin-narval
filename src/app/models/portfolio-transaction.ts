export class PortfolioTransaction {
  private _unit: number;
  private _invested: number;
  private _openedAt: number;
  private _openDate: Date;
  private _profitAndLoss: number;

  constructor(unit: number, invested: number, openedAt: number, openDate: Date, profitAndLoss: number) {
    this._unit = unit;
    this._invested = invested;
    this._openedAt = openedAt;
    this._openDate = openDate;
    this._profitAndLoss = profitAndLoss;
  }

  get unit(): number {
    return this._unit;
  }

  set unit(value: number) {
    this._unit = value;
  }

  get invested(): number {
    return this._invested;
  }

  set invested(value: number) {
    this._invested = value;
  }

  get openedAt(): number {
    return this._openedAt;
  }

  set openedAt(value: number) {
    this._openedAt = value;
  }

  get openDate(): Date {
    return this._openDate;
  }

  set openDate(value: Date) {
    this._openDate = value;
  }

  get profitAndLoss(): number {
    return this._profitAndLoss;
  }

  set profitAndLoss(value: number) {
    this._profitAndLoss = value;
  }
}

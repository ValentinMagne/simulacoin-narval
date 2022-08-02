export class PortfolioUtil {
  public static getProfitAndLoss(invested: number, openedAt: number, closedAt: number): number {
    return +((closedAt - openedAt) * PortfolioUtil.getUnit(invested, openedAt));
  }

  public static getUnit(invested: number, openedAt: number): number {
    return +(invested / openedAt);
  }
}

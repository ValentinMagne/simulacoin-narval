import { TransactionTypeNum } from "../enums/transaction-type.num";

export interface UserBusiness {
  username: string;
  purse: Purse;
}

interface Purse {
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  type: TransactionTypeNum;
  invested: number;
  openedAt: number;
  openDate: Date;
  closedAt: number;
  closeDate: Date;
  opened: boolean;
}

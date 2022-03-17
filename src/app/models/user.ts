import { TransactionTypeNum } from "../enums/transaction-type.num";

export interface User {
  username: string;
  purse: Purse;
}

interface Purse {
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  type: TransactionTypeNum;
  invested: number;
  openedAt: number;
  openDate: Date;
  closedAt: number;
  closeDate: Date;
  opened: boolean;
}

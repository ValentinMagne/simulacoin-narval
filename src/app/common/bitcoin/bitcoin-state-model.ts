import { BitcoinBusiness } from "../business/bitcoin.business";

export interface BitcoinStateModel {
  bitcoin: BitcoinBusiness | null;
}

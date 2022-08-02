import { UserBusiness } from "../business/user.business";

export interface UserStateModel {
  user: UserBusiness | null;
}

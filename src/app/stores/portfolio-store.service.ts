import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";

import { Transaction, User } from "../models/user";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class PortfolioStoreService {

  private _transactions$: ReplaySubject<Transaction[]> = new ReplaySubject<Transaction[]>(1);

  constructor(private readonly userService: UserService) {
  }

  public enter(): void {
    this.userService.currentUser$.subscribe((user: User) => {
      this._transactions$.next(user.purse.transactions.filter((t: Transaction) => t.opened));
    })
  }


  get transactions$(): Observable<Transaction[]> {
    return this._transactions$.asObservable();
  }
}

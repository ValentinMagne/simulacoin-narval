import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";

import { PortfolioHistoric } from "../models/portfolio-historic";
import { PortfolioStoreService } from '../stores/portfolio-store.service';
import { PortfolioTransaction } from "../models/portfolio-transaction";
import { UserState } from "../../../common/user/user-state";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PortfolioComponent implements OnInit, OnDestroy {

  @Select(UserState.openedTransactions) openedTransactions$!: Observable<PortfolioTransaction[] | undefined>;
  @Select(UserState.historic) historic$!: Observable<PortfolioHistoric>;
  public displayedColumns = ['invested', 'openedAt', 'unit', 'profitAndLoss'];
  public expandedElement: PortfolioTransaction | undefined;

  constructor(private readonly portfolioStore: PortfolioStoreService) {
  }

  ngOnInit(): void {
    this.portfolioStore.enter();
  }

  ngOnDestroy(): void {
    this.portfolioStore.leave();
  }

  public sell(transactionId: number): void {
    this.portfolioStore.sell(transactionId);
  }

}

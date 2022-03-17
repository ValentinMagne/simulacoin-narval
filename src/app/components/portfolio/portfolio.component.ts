import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from '@angular/core';

import { PortfolioStoreService } from '../../stores/portfolio-store.service';
import { PortfolioTransaction } from "../../models/portfolio-transaction";

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

  public transactions$ = this.portfolioStore.transactions$;
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

}

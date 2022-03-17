import { Component, OnDestroy, OnInit } from '@angular/core';

import { PortfolioStoreService } from '../../stores/portfolio-store.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  public transactions$ = this.portfolioStore.transactions$;
  public displayedColumns = ['invested', 'openedAt', 'unit', 'profitAndLoss'];

  constructor(private readonly portfolioStore: PortfolioStoreService) {
  }

  ngOnInit(): void {
    this.portfolioStore.enter();
  }

  ngOnDestroy(): void {
    this.portfolioStore.leave();
  }

}

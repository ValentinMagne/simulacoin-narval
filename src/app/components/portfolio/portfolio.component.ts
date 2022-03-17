import { Component, OnInit } from '@angular/core';

import { PortfolioStoreService } from '../../stores/portfolio-store.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public transactions$ = this.portfolioStore.transactions$;
  public displayedColumns = ['type', 'openAt', 'openDate', 'opened'];

  constructor(private readonly portfolioStore: PortfolioStoreService) {
  }

  ngOnInit(): void {
    this.portfolioStore.enter();
  }

}

import { TestBed } from '@angular/core/testing';

import { PortfolioStoreService } from '../portfolio-store.service';

describe('PortfolioStoreService', () => {
  let service: PortfolioStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

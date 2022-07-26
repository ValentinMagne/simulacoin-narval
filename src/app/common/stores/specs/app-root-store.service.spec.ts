import { TestBed } from '@angular/core/testing';

import { AppRootStoreService } from '../app-root-store.service';

describe('AppRootStoreService', () => {
  let service: AppRootStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRootStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

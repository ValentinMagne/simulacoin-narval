import { TestBed } from '@angular/core/testing';

import { ErrorStoreService } from './error-store.service';

describe('ErrorStoreService', () => {
  let service: ErrorStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

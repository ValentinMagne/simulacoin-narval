import { TestBed } from '@angular/core/testing';

import { ConfigStoreService } from '../config-store.service';

describe('ConfigStoreService', () => {
  let service: ConfigStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApiLauraService } from './api-laura.service';

describe('ApiLauraService', () => {
  let service: ApiLauraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLauraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

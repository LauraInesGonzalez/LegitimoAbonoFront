import { TestBed } from '@angular/core/testing';

import { ApiArielService } from './api-ariel.service';

describe('ApiArielService', () => {
  let service: ApiArielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiArielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

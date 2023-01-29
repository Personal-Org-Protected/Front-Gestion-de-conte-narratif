import { TestBed } from '@angular/core/testing';

import { HttpApiQueryService } from './http-api-query.service';

describe('HttpApiQueryService', () => {
  let service: HttpApiQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpApiQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

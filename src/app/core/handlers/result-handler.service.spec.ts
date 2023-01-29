import { TestBed } from '@angular/core/testing';

import { ResultHandlerService } from './result-handler.service';

describe('ResultHandlerService', () => {
  let service: ResultHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BarServiceService } from './bar-service.service';

describe('BarServiceService', () => {
  let service: BarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

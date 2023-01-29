import { TestBed } from '@angular/core/testing';

import { HttpApiCommandService } from './http-api-command.service';

describe('HttpApiCommandService', () => {
  let service: HttpApiCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpApiCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

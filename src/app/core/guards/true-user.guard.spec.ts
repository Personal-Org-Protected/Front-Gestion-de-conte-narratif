import { TestBed } from '@angular/core/testing';

import { TrueUserGuard } from './true-user.guard';

describe('TrueUserGuard', () => {
  let guard: TrueUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrueUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

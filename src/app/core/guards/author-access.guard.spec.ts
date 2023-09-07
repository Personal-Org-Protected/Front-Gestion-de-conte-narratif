import { TestBed } from '@angular/core/testing';

import { AuthorAccessGuard } from './author-access.guard';

describe('AuthorAccessGuard', () => {
  let guard: AuthorAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

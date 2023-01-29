import { TestBed } from '@angular/core/testing';

import { HttpParameterInterceptor } from './http-parameter.interceptor';

describe('HttpParameterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpParameterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpParameterInterceptor = TestBed.inject(HttpParameterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

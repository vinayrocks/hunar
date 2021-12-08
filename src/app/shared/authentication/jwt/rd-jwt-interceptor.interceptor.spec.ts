import { TestBed } from '@angular/core/testing';

import { RdJwtInterceptorInterceptor } from './rd-jwt-interceptor.interceptor';

describe('RdJwtInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RdJwtInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RdJwtInterceptorInterceptor = TestBed.inject(RdJwtInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

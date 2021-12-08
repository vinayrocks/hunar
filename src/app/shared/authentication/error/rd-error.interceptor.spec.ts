import { TestBed } from '@angular/core/testing';

import { RdErrorInterceptor } from './rd-error.interceptor';

describe('RdErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RdErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RdErrorInterceptor = TestBed.inject(RdErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

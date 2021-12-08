import { TestBed } from '@angular/core/testing';

import { RdFakeDatabaseInterceptor } from './rd-fake-database.interceptor';

describe('RdFakeDatabaseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RdFakeDatabaseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RdFakeDatabaseInterceptor = TestBed.inject(RdFakeDatabaseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApiPrefixInterceptor } from './api-prefix.interceptor';

describe('ApiPrefix.InterceptorService', () => {
  let service: ApiPrefixInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPrefixInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

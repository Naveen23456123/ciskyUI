import { TestBed } from '@angular/core/testing';

import { CoreAPIService } from './coreapi.service';

describe('CoreAPIService', () => {
  let service: CoreAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

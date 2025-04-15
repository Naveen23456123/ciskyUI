import { TestBed } from '@angular/core/testing';

import { InsuranceInterfaceService } from './insurance-interface.service';

describe('InsuranceInterfaceService', () => {
  let service: InsuranceInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

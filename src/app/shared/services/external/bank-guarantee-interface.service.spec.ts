import { TestBed } from '@angular/core/testing';

import { BankGuaranteeInterfaceService } from './bank-guarantee-interface.service';

describe('BankGuaranteeInterfaceService', () => {
  let service: BankGuaranteeInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankGuaranteeInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

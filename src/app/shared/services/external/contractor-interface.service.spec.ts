import { TestBed } from '@angular/core/testing';

import { ContractorInterfaceService } from './contractor-interface.service';

describe('ContractorInterfaceService', () => {
  let service: ContractorInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SubCompanyInterfaceService } from './sub-company-interface.service';

describe('SubCompanyInterfaceService', () => {
  let service: SubCompanyInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCompanyInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

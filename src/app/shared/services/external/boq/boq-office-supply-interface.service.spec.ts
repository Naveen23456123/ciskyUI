import { TestBed } from '@angular/core/testing';

import { BoqOfficeSupplyInterfaceService } from './boq-office-supply-interface.service';

describe('BoqOfficeSupplyInterfaceService', () => {
  let service: BoqOfficeSupplyInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqOfficeSupplyInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

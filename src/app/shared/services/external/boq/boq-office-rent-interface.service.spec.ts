import { TestBed } from '@angular/core/testing';

import { BoqOfficeRentInterfaceService } from './boq-office-rent-interface.service';

describe('BoqOfficeRentInterfaceService', () => {
  let service: BoqOfficeRentInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqOfficeRentInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

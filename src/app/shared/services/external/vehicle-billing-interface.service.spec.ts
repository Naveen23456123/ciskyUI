import { TestBed } from '@angular/core/testing';

import { VehicleBillingInterfaceService } from './vehicle-billing-interface.service';

describe('VehicleBillingInterfaceService', () => {
  let service: VehicleBillingInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleBillingInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

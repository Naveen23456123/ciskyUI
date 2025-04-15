import { TestBed } from '@angular/core/testing';

import { VehicleInterfaceService } from './vehicle-interface.service';

describe('VehicleInterfaceService', () => {
  let service: VehicleInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VehicleLogInterfaceService } from './vehicle-log-interface.service';

describe('VehicleLogInterfaceService', () => {
  let service: VehicleLogInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleLogInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BoqTransportationInterfaceService } from './boq-transportation-interface.service';

describe('BoqTransportationInterfaceService', () => {
  let service: BoqTransportationInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqTransportationInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

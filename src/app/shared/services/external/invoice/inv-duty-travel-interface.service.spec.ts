import { TestBed } from '@angular/core/testing';

import { InvDutyTravelInterfaceService } from './inv-duty-travel-interface.service';

describe('InvDutyTravelInterfaceService', () => {
  let service: InvDutyTravelInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvDutyTravelInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

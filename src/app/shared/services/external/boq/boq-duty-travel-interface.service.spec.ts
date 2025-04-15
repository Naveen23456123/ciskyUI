import { TestBed } from '@angular/core/testing';

import { BoqDutyTravelInterfaceService } from './boq-duty-travel-interface.service';

describe('BoqDutyTravelInterfaceService', () => {
  let service: BoqDutyTravelInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqDutyTravelInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

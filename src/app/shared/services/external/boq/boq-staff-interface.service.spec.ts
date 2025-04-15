import { TestBed } from '@angular/core/testing';

import { BoqStaffInterfaceService } from './boq-staff-interface.service';

describe('BoqStaffInterfaceService', () => {
  let service: BoqStaffInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqStaffInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

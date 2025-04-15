import { TestBed } from '@angular/core/testing';

import { InvStaffInterfaceService } from './inv-staff-interface.service';

describe('InvStaffInterfaceService', () => {
  let service: InvStaffInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvStaffInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

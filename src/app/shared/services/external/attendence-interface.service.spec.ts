import { TestBed } from '@angular/core/testing';

import { AttendenceInterfaceService } from './attendence-interface.service';

describe('AttendenceInterfaceService', () => {
  let service: AttendenceInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendenceInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

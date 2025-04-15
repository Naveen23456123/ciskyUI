import { TestBed } from '@angular/core/testing';

import { EmployeeInterfaceService } from './employee-interface.service';

describe('EmployeeInterfaceService', () => {
  let service: EmployeeInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

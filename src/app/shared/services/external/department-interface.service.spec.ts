import { TestBed } from '@angular/core/testing';

import { DepartmentInterfaceService } from './department-interface.service';

describe('DepartmentInterfaceService', () => {
  let service: DepartmentInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

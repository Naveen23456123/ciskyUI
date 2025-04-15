import { TestBed } from '@angular/core/testing';

import { AdminInterfaceService } from './admin-interface.service';

describe('AdminService', () => {
  let service: AdminInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

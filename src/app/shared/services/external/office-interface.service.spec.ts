import { TestBed } from '@angular/core/testing';

import { OfficeInterfaceService } from './office-interface.service';

describe('OfficeInterfaceService', () => {
  let service: OfficeInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

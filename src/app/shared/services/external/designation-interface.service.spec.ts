import { TestBed } from '@angular/core/testing';

import { DesignationInterfaceService } from './designation-interface.service';

describe('DesignationInterfaceService', () => {
  let service: DesignationInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignationInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

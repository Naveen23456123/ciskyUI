import { TestBed } from '@angular/core/testing';

import { InvOfcSupplyInterfaceService } from './inv-ofc-supply-interface.service';

describe('InvOfcSupplyInterfaceService', () => {
  let service: InvOfcSupplyInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvOfcSupplyInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

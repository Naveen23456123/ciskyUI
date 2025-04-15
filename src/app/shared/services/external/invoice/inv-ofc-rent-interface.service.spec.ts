import { TestBed } from '@angular/core/testing';

import { InvOfcRentInterfaceService } from './inv-ofc-rent-interface.service';

describe('InvOfcRentInterfaceService', () => {
  let service: InvOfcRentInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvOfcRentInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

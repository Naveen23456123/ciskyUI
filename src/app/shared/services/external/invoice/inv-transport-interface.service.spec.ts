import { TestBed } from '@angular/core/testing';

import { InvTransportInterfaceService } from './inv-transport-interface.service';

describe('InvTransportInterfaceService', () => {
  let service: InvTransportInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvTransportInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

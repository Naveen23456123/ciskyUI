import { TestBed } from '@angular/core/testing';

import { TicketInterfaceService } from './ticket-interface.service';

describe('TicketInterfaceService', () => {
  let service: TicketInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

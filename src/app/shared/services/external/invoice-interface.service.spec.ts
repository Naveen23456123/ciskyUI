import { TestBed } from '@angular/core/testing';

import { InvoiceInterfaceService } from './invoice-interface.service';

describe('InvoiceInterfaceService', () => {
  let service: InvoiceInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InventoryControlService } from './inventory-control.service';

describe('InventoryControlService', () => {
  let service: InventoryControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

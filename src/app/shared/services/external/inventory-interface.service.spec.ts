import { TestBed } from '@angular/core/testing';

import { InventoryInterfaceService } from './inventory-interface.service';

describe('InventoryInterfaceService', () => {
  let service: InventoryInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

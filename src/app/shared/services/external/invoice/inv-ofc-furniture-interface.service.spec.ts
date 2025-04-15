import { TestBed } from '@angular/core/testing';

import { InvOfcFurnitureInterfaceService } from './inv-ofc-furniture-interface.service';

describe('InvOfcFurnitureInterfaceService', () => {
  let service: InvOfcFurnitureInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvOfcFurnitureInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

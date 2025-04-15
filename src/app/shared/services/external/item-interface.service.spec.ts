import { TestBed } from '@angular/core/testing';

import { ItemInterfaceService } from './item-interface.service';

describe('ItemInterfaceService', () => {
  let service: ItemInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

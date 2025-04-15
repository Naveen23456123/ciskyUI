import { TestBed } from '@angular/core/testing';

import { CosInterfaceService } from './cos-interface.service';

describe('CosInterfaceService', () => {
  let service: CosInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

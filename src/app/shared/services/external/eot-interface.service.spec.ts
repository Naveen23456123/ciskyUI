import { TestBed } from '@angular/core/testing';

import { EotInterfaceService } from './eot-interface.service';

describe('EotInterfaceService', () => {
  let service: EotInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EotInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

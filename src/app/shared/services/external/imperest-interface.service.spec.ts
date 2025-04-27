import { TestBed } from '@angular/core/testing';

import { ImperestInterfaceService } from './imperest-interface.service';

describe('ImperestInterfaceService', () => {
  let service: ImperestInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImperestInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MiscInterfaceService } from './misc-interface.service';

describe('MiscInterfaceService', () => {
  let service: MiscInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiscInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

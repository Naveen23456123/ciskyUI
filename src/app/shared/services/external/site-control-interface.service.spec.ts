import { TestBed } from '@angular/core/testing';

import { SiteControlInterfaceService } from './site-control-interface.service';

describe('SiteControlInterfaceService', () => {
  let service: SiteControlInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteControlInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

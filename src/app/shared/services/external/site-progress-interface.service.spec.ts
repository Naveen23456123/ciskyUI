import { TestBed } from '@angular/core/testing';

import { SiteProgressInterfaceService } from './site-progress-interface.service';

describe('SiteProgressInterfaceService', () => {
  let service: SiteProgressInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteProgressInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

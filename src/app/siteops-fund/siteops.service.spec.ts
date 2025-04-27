import { TestBed } from '@angular/core/testing';

import { SiteopsService } from './siteops.service';

describe('SiteopsService', () => {
  let service: SiteopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

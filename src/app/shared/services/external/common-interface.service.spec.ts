import { TestBed } from '@angular/core/testing';

import { CommonInterfaceService } from './common-interface.service';

describe('CommonInterfaceService', () => {
  let service: CommonInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

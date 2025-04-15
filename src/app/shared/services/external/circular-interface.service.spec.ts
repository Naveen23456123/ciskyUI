import { TestBed } from '@angular/core/testing';

import { CircularInterfaceService } from './circular-interface.service';

describe('CircularInterfaceService', () => {
  let service: CircularInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircularInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InvContingencyInterfaceService } from './inv-contingency-interface.service';

describe('InvContingencyInterfaceService', () => {
  let service: InvContingencyInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvContingencyInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

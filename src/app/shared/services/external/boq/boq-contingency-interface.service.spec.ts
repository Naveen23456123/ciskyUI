import { TestBed } from '@angular/core/testing';

import { BoqContingencyInterfaceService } from './boq-contingency-interface.service';

describe('BoqContingencyInterfaceService', () => {
  let service: BoqContingencyInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqContingencyInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

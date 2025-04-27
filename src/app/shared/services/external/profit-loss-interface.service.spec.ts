import { TestBed } from '@angular/core/testing';

import { ProfitLossInterfaceService } from './profit-loss-interface.service';

describe('ProfitLossInterfaceService', () => {
  let service: ProfitLossInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfitLossInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

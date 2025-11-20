import { TestBed } from '@angular/core/testing';

import { ReleaseExpenseInterfaceService } from './release-expense-interface.service';

describe('ReleaseExpenseInterfaceService', () => {
  let service: ReleaseExpenseInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseExpenseInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

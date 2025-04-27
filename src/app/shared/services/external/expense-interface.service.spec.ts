import { TestBed } from '@angular/core/testing';

import { ExpenseInterfaceService } from './expense-interface.service';

describe('ExpenseInterfaceService', () => {
  let service: ExpenseInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

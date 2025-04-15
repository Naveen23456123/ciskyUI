import { TestBed } from '@angular/core/testing';

import { ConsultantAccountInterfaceService } from './consultant-account-interface.service';

describe('ConsultantAccountInterfaceService', () => {
  let service: ConsultantAccountInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultantAccountInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

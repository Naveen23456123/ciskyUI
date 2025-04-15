import { TestBed } from '@angular/core/testing';

import { InvReportDocInterfaceService } from './inv-report-doc-interface.service';

describe('InvReportDocInterfaceService', () => {
  let service: InvReportDocInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvReportDocInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

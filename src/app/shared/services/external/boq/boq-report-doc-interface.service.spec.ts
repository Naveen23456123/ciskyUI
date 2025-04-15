import { TestBed } from '@angular/core/testing';

import { BoqReportDocInterfaceService } from './boq-report-doc-interface.service';

describe('BoqReportDocInterfaceService', () => {
  let service: BoqReportDocInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqReportDocInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

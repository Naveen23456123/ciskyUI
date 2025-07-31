import { TestBed } from '@angular/core/testing';

import { ProjectReportInterfaceService } from './project-report-interface.service';

describe('ProjectReportInterfaceService', () => {
  let service: ProjectReportInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectReportInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

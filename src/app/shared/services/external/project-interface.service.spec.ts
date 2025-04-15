import { TestBed } from '@angular/core/testing';

import { ProjectInterfaceService } from './project-interface.service';

describe('ProjectInterfaceService', () => {
  let service: ProjectInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

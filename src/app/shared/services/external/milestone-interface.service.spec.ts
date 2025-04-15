import { TestBed } from '@angular/core/testing';

import { MilestoneInterfaceService } from './milestone-interface.service';

describe('MilestoneInterfaceService', () => {
  let service: MilestoneInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

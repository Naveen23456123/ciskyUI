import { TestBed } from '@angular/core/testing';

import { InvRoadSurveyInterfaceService } from './inv-road-survey-interface.service';

describe('InvRoadSurveyInterfaceService', () => {
  let service: InvRoadSurveyInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvRoadSurveyInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

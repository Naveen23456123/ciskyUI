import { TestBed } from '@angular/core/testing';

import { BoqRoadSurveyInterfaceService } from './boq-road-survey-interface.service';

describe('BoqRoadSurveyInterfaceService', () => {
  let service: BoqRoadSurveyInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqRoadSurveyInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

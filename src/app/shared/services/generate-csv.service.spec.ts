import { TestBed } from '@angular/core/testing';

import { GenerateCsvService } from './generate-csv.service';

describe('GenerateCsvService', () => {
  let service: GenerateCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

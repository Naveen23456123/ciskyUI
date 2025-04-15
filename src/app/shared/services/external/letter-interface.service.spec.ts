import { TestBed } from '@angular/core/testing';

import { LetterInterfaceService } from './letter-interface.service';

describe('LetterInterfaceService', () => {
  let service: LetterInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

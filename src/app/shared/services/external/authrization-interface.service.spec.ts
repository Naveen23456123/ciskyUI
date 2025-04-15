import { TestBed } from '@angular/core/testing';

import { AuthrizationInterfaceService } from './authrization-interface.service';

describe('AuthrizationInterfaceService', () => {
  let service: AuthrizationInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthrizationInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

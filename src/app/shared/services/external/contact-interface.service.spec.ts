import { TestBed } from '@angular/core/testing';

import { ContactInterfaceService } from './contact-interface.service';

describe('ContactInterfaceService', () => {
  let service: ContactInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

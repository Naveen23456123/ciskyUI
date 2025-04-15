import { TestBed } from '@angular/core/testing';

import { BoqOfficeFurnitureInterfaceService } from './boq-office-furniture-interface.service';

describe('BoqOfficeFurnitureInterfaceService', () => {
  let service: BoqOfficeFurnitureInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqOfficeFurnitureInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NotifyBarService } from './notify-bar.service';

describe('NotifyBarService', () => {
  let service: NotifyBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

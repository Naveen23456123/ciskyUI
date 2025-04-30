import { TestBed } from '@angular/core/testing';

import { SettingInterfaceService } from './setting-interface.service';

describe('SettingInterfaceService', () => {
  let service: SettingInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

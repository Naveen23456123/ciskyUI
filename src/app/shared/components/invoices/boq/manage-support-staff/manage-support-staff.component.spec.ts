import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupportStaffComponent } from './manage-support-staff.component';

describe('ManageSupportStaffComponent', () => {
  let component: ManageSupportStaffComponent;
  let fixture: ComponentFixture<ManageSupportStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSupportStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupportStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

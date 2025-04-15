import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyStaffComponent } from './manage-consultancy-staff.component';

describe('ManageConsultancyStaffComponent', () => {
  let component: ManageConsultancyStaffComponent;
  let fixture: ComponentFixture<ManageConsultancyStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqStaffComponent } from './add-boq-staff.component';

describe('AddBoqStaffComponent', () => {
  let component: AddBoqStaffComponent;
  let fixture: ComponentFixture<AddBoqStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

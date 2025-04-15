import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqStaffComponent } from './edit-boq-staff.component';

describe('EditBoqStaffComponent', () => {
  let component: EditBoqStaffComponent;
  let fixture: ComponentFixture<EditBoqStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

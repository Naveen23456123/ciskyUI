import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoqAttendenceComponent } from './manage-boq-attendence.component';

describe('ManageBoqAttendenceComponent', () => {
  let component: ManageBoqAttendenceComponent;
  let fixture: ComponentFixture<ManageBoqAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBoqAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBoqAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqAttendenceComponent } from './edit-boq-attendence.component';

describe('EditBoqAttendenceComponent', () => {
  let component: EditBoqAttendenceComponent;
  let fixture: ComponentFixture<EditBoqAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActualAttendenceComponent } from './edit-actual-attendence.component';

describe('EditActualAttendenceComponent', () => {
  let component: EditActualAttendenceComponent;
  let fixture: ComponentFixture<EditActualAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditActualAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActualAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

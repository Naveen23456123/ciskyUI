import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActualAttendenceComponent } from './add-actual-attendence.component';

describe('AddActualAttendenceComponent', () => {
  let component: AddActualAttendenceComponent;
  let fixture: ComponentFixture<AddActualAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddActualAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActualAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

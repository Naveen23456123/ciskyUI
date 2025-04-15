import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqAttendenceComponent } from './add-boq-attendence.component';

describe('AddBoqAttendenceComponent', () => {
  let component: AddBoqAttendenceComponent;
  let fixture: ComponentFixture<AddBoqAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

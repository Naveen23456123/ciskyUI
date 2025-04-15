import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActualAttendenceComponent } from './delete-actual-attendence.component';

describe('DeleteActualAttendenceComponent', () => {
  let component: DeleteActualAttendenceComponent;
  let fixture: ComponentFixture<DeleteActualAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteActualAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteActualAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

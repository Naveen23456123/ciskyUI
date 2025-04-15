import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqAttendenceComponent } from './delete-boq-attendence.component';

describe('DeleteBoqAttendenceComponent', () => {
  let component: DeleteBoqAttendenceComponent;
  let fixture: ComponentFixture<DeleteBoqAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

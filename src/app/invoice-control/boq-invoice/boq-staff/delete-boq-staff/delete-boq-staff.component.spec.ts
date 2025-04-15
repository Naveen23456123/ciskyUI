import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqStaffComponent } from './delete-boq-staff.component';

describe('DeleteBoqStaffComponent', () => {
  let component: DeleteBoqStaffComponent;
  let fixture: ComponentFixture<DeleteBoqStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

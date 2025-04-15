import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConStaffComponent } from './delete-con-staff.component';

describe('DeleteConStaffComponent', () => {
  let component: DeleteConStaffComponent;
  let fixture: ComponentFixture<DeleteConStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

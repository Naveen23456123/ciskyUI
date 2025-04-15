import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConStaffComponent } from './edit-con-staff.component';

describe('EditConStaffComponent', () => {
  let component: EditConStaffComponent;
  let fixture: ComponentFixture<EditConStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

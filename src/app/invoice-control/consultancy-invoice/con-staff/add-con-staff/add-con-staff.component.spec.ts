import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConStaffComponent } from './add-con-staff.component';

describe('AddConStaffComponent', () => {
  let component: AddConStaffComponent;
  let fixture: ComponentFixture<AddConStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

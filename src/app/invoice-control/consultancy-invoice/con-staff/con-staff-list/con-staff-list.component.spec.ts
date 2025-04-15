import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConStaffListComponent } from './con-staff-list.component';

describe('ConStaffListComponent', () => {
  let component: ConStaffListComponent;
  let fixture: ComponentFixture<ConStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConStaffListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

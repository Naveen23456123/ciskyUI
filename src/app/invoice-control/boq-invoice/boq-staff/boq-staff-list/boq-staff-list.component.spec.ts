import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqStaffListComponent } from './boq-staff-list.component';

describe('BoqStaffListComponent', () => {
  let component: BoqStaffListComponent;
  let fixture: ComponentFixture<BoqStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqStaffListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

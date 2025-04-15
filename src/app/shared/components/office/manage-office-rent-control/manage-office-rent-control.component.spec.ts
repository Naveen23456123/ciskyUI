import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficeRentControlComponent } from './manage-office-rent-control.component';

describe('ManageOfficeRentControlComponent', () => {
  let component: ManageOfficeRentControlComponent;
  let fixture: ComponentFixture<ManageOfficeRentControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOfficeRentControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfficeRentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

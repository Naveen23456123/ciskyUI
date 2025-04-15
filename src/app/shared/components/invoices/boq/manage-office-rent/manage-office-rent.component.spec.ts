import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficeRentComponent } from './manage-office-rent.component';

describe('ManageOfficeRentComponent', () => {
  let component: ManageOfficeRentComponent;
  let fixture: ComponentFixture<ManageOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

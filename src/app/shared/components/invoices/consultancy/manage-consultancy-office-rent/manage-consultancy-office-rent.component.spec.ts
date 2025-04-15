import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyOfficeRentComponent } from './manage-consultancy-office-rent.component';

describe('ManageConsultancyOfficeRentComponent', () => {
  let component: ManageConsultancyOfficeRentComponent;
  let fixture: ComponentFixture<ManageConsultancyOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

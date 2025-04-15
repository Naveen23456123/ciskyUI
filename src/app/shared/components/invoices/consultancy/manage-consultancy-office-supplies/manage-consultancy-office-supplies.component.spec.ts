import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyOfficeSuppliesComponent } from './manage-consultancy-office-supplies.component';

describe('ManageConsultancyOfficeSuppliesComponent', () => {
  let component: ManageConsultancyOfficeSuppliesComponent;
  let fixture: ComponentFixture<ManageConsultancyOfficeSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyOfficeSuppliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyOfficeSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

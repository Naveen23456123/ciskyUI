import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyOfficeFurnitureComponent } from './manage-consultancy-office-furniture.component';

describe('ManageConsultancyOfficeFurnitureComponent', () => {
  let component: ManageConsultancyOfficeFurnitureComponent;
  let fixture: ComponentFixture<ManageConsultancyOfficeFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyOfficeFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyOfficeFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

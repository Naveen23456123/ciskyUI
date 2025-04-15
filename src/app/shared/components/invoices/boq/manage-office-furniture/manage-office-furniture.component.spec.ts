import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficeFurnitureComponent } from './manage-office-furniture.component';

describe('ManageOfficeFurnitureComponent', () => {
  let component: ManageOfficeFurnitureComponent;
  let fixture: ComponentFixture<ManageOfficeFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOfficeFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfficeFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficeSuppliesComponent } from './manage-office-supplies.component';

describe('ManageOfficeSuppliesComponent', () => {
  let component: ManageOfficeSuppliesComponent;
  let fixture: ComponentFixture<ManageOfficeSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOfficeSuppliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfficeSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

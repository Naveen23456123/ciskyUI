import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqOfficeSupplyComponent } from './add-boq-office-supply.component';

describe('AddBoqOfficeSupplyComponent', () => {
  let component: AddBoqOfficeSupplyComponent;
  let fixture: ComponentFixture<AddBoqOfficeSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqOfficeSupplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqOfficeSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

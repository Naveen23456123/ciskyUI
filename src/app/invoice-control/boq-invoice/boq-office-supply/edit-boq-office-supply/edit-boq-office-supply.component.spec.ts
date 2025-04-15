import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqOfficeSupplyComponent } from './edit-boq-office-supply.component';

describe('EditBoqOfficeSupplyComponent', () => {
  let component: EditBoqOfficeSupplyComponent;
  let fixture: ComponentFixture<EditBoqOfficeSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqOfficeSupplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqOfficeSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

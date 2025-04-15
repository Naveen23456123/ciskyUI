import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqOfficeSupplyComponent } from './delete-boq-office-supply.component';

describe('DeleteBoqOfficeSupplyComponent', () => {
  let component: DeleteBoqOfficeSupplyComponent;
  let fixture: ComponentFixture<DeleteBoqOfficeSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqOfficeSupplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqOfficeSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

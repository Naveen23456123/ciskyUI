import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinanceCostComponent } from './edit-finance-cost.component';

describe('EditFinanceCostComponent', () => {
  let component: EditFinanceCostComponent;
  let fixture: ComponentFixture<EditFinanceCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFinanceCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFinanceCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

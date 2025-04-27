import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFinanceCostComponent } from './delete-finance-cost.component';

describe('DeleteFinanceCostComponent', () => {
  let component: DeleteFinanceCostComponent;
  let fixture: ComponentFixture<DeleteFinanceCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFinanceCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFinanceCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

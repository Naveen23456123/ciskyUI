import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimExpenseComponent } from './claim-expense.component';

describe('ClaimExpenseComponent', () => {
  let component: ClaimExpenseComponent;
  let fixture: ComponentFixture<ClaimExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

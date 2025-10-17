import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminExpenseComponent } from './manage-admin-expense.component';

describe('ManageAdminExpenseComponent', () => {
  let component: ManageAdminExpenseComponent;
  let fixture: ComponentFixture<ManageAdminExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAdminExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdminExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

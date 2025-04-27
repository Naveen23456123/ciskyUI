import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherIncomeComponent } from './edit-other-income.component';

describe('EditOtherIncomeComponent', () => {
  let component: EditOtherIncomeComponent;
  let fixture: ComponentFixture<EditOtherIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOtherIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOtherIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

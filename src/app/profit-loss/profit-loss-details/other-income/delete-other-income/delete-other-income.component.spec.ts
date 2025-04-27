import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOtherIncomeComponent } from './delete-other-income.component';

describe('DeleteOtherIncomeComponent', () => {
  let component: DeleteOtherIncomeComponent;
  let fixture: ComponentFixture<DeleteOtherIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteOtherIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOtherIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

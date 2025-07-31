import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfitLossSheetComponent } from './manage-profit-loss-sheet.component';

describe('ManageProfitLossSheetComponent', () => {
  let component: ManageProfitLossSheetComponent;
  let fixture: ComponentFixture<ManageProfitLossSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageProfitLossSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProfitLossSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

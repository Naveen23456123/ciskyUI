import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfitLossComponent } from './manage-profit-loss.component';

describe('ManageProfitLossComponent', () => {
  let component: ManageProfitLossComponent;
  let fixture: ComponentFixture<ManageProfitLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageProfitLossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

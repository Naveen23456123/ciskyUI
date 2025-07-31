import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossInvDetailsComponent } from './profit-loss-inv-details.component';

describe('ProfitLossInvDetailsComponent', () => {
  let component: ProfitLossInvDetailsComponent;
  let fixture: ComponentFixture<ProfitLossInvDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossInvDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossInvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

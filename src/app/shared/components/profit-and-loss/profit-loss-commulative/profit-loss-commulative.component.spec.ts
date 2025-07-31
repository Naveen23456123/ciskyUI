import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossCommulativeComponent } from './profit-loss-commulative.component';

describe('ProfitLossCommulativeComponent', () => {
  let component: ProfitLossCommulativeComponent;
  let fixture: ComponentFixture<ProfitLossCommulativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossCommulativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossCommulativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossDetailsComponent } from './profit-loss-details.component';

describe('ProfitLossDetailsComponent', () => {
  let component: ProfitLossDetailsComponent;
  let fixture: ComponentFixture<ProfitLossDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossDetailedComponent } from './profit-loss-detailed.component';

describe('ProfitLossDetailedComponent', () => {
  let component: ProfitLossDetailedComponent;
  let fixture: ComponentFixture<ProfitLossDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

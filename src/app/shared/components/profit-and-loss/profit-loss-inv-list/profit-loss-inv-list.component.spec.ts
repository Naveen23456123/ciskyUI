import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossInvListComponent } from './profit-loss-inv-list.component';

describe('ProfitLossInvListComponent', () => {
  let component: ProfitLossInvListComponent;
  let fixture: ComponentFixture<ProfitLossInvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossInvListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossInvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

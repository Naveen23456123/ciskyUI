import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossListComponent } from './profit-loss-list.component';

describe('ProfitLossListComponent', () => {
  let component: ProfitLossListComponent;
  let fixture: ComponentFixture<ProfitLossListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

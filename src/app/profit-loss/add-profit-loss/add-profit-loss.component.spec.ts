import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfitLossComponent } from './add-profit-loss.component';

describe('AddProfitLossComponent', () => {
  let component: AddProfitLossComponent;
  let fixture: ComponentFixture<AddProfitLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProfitLossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

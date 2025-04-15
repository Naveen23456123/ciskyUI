import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankGuaranteeListComponent } from './bank-guarantee-list.component';

describe('BankGuaranteeListComponent', () => {
  let component: BankGuaranteeListComponent;
  let fixture: ComponentFixture<BankGuaranteeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankGuaranteeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankGuaranteeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

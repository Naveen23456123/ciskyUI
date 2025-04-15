import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankGuaranteeComponent } from './manage-bank-guarantee.component';

describe('ManageBankGuaranteeComponent', () => {
  let component: ManageBankGuaranteeComponent;
  let fixture: ComponentFixture<ManageBankGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBankGuaranteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBankGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

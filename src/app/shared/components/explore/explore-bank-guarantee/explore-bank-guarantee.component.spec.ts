import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreBankGuaranteeComponent } from './explore-bank-guarantee.component';

describe('ExploreBankGuaranteeComponent', () => {
  let component: ExploreBankGuaranteeComponent;
  let fixture: ComponentFixture<ExploreBankGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreBankGuaranteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreBankGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

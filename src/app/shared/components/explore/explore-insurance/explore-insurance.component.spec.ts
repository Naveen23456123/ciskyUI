import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreInsuranceComponent } from './explore-insurance.component';

describe('ExploreInsuranceComponent', () => {
  let component: ExploreInsuranceComponent;
  let fixture: ComponentFixture<ExploreInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreInsuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

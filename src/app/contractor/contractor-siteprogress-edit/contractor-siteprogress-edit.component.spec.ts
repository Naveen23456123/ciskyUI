import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSiteprogressEditComponent } from './contractor-siteprogress-edit.component';

describe('ContractorSiteprogressEditComponent', () => {
  let component: ContractorSiteprogressEditComponent;
  let fixture: ComponentFixture<ContractorSiteprogressEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorSiteprogressEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorSiteprogressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

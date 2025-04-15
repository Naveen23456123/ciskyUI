import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSiteprogressAddComponent } from './contractor-siteprogress-add.component';

describe('ContractorSiteprogressAddComponent', () => {
  let component: ContractorSiteprogressAddComponent;
  let fixture: ComponentFixture<ContractorSiteprogressAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorSiteprogressAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorSiteprogressAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSiteprogressListComponent } from './contractor-siteprogress-list.component';

describe('ContractorSiteprogressListComponent', () => {
  let component: ContractorSiteprogressListComponent;
  let fixture: ComponentFixture<ContractorSiteprogressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorSiteprogressListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorSiteprogressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

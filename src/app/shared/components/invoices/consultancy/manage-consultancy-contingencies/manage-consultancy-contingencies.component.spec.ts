import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyContingenciesComponent } from './manage-consultancy-contingencies.component';

describe('ManageConsultancyContingenciesComponent', () => {
  let component: ManageConsultancyContingenciesComponent;
  let fixture: ComponentFixture<ManageConsultancyContingenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyContingenciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyContingenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

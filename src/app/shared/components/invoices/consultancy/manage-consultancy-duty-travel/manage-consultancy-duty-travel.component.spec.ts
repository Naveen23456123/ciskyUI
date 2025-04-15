import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyDutyTravelComponent } from './manage-consultancy-duty-travel.component';

describe('ManageConsultancyDutyTravelComponent', () => {
  let component: ManageConsultancyDutyTravelComponent;
  let fixture: ComponentFixture<ManageConsultancyDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

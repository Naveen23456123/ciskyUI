import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDutyTravelComponent } from './manage-duty-travel.component';

describe('ManageDutyTravelComponent', () => {
  let component: ManageDutyTravelComponent;
  let fixture: ComponentFixture<ManageDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

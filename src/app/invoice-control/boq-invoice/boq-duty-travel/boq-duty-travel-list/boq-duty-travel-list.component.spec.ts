import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqDutyTravelListComponent } from './boq-duty-travel-list.component';

describe('BoqDutyTravelListComponent', () => {
  let component: BoqDutyTravelListComponent;
  let fixture: ComponentFixture<BoqDutyTravelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqDutyTravelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqDutyTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqDutyTravelComponent } from './add-boq-duty-travel.component';

describe('AddBoqDutyTravelComponent', () => {
  let component: AddBoqDutyTravelComponent;
  let fixture: ComponentFixture<AddBoqDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

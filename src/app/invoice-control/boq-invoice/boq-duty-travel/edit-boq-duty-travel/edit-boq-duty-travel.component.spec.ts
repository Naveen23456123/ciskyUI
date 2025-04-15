import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqDutyTravelComponent } from './edit-boq-duty-travel.component';

describe('EditBoqDutyTravelComponent', () => {
  let component: EditBoqDutyTravelComponent;
  let fixture: ComponentFixture<EditBoqDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

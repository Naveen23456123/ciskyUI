import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConDutyTravelComponent } from './edit-con-duty-travel.component';

describe('EditConDutyTravelComponent', () => {
  let component: EditConDutyTravelComponent;
  let fixture: ComponentFixture<EditConDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

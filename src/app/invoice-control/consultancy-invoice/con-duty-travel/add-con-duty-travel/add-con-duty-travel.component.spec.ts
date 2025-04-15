import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConDutyTravelComponent } from './add-con-duty-travel.component';

describe('AddConDutyTravelComponent', () => {
  let component: AddConDutyTravelComponent;
  let fixture: ComponentFixture<AddConDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqDutyTravelComponent } from './delete-boq-duty-travel.component';

describe('DeleteBoqDutyTravelComponent', () => {
  let component: DeleteBoqDutyTravelComponent;
  let fixture: ComponentFixture<DeleteBoqDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

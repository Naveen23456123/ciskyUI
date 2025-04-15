import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConDutyTravelComponent } from './delete-con-duty-travel.component';

describe('DeleteConDutyTravelComponent', () => {
  let component: DeleteConDutyTravelComponent;
  let fixture: ComponentFixture<DeleteConDutyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConDutyTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConDutyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

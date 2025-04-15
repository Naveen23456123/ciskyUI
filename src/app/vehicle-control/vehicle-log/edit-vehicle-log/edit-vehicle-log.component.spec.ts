import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleLogComponent } from './edit-vehicle-log.component';

describe('EditVehicleLogComponent', () => {
  let component: EditVehicleLogComponent;
  let fixture: ComponentFixture<EditVehicleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVehicleLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehicleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

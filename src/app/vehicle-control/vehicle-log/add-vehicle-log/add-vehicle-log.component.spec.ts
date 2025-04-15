import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleLogComponent } from './add-vehicle-log.component';

describe('AddVehicleLogComponent', () => {
  let component: AddVehicleLogComponent;
  let fixture: ComponentFixture<AddVehicleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVehicleLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

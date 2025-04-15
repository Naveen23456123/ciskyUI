import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVehicleLogComponent } from './view-vehicle-log.component';

describe('ViewVehicleLogComponent', () => {
  let component: ViewVehicleLogComponent;
  let fixture: ComponentFixture<ViewVehicleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewVehicleLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVehicleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

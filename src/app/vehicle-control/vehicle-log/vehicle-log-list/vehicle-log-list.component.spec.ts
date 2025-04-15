import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLogListComponent } from './vehicle-log-list.component';

describe('VehicleLogListComponent', () => {
  let component: VehicleLogListComponent;
  let fixture: ComponentFixture<VehicleLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleLogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

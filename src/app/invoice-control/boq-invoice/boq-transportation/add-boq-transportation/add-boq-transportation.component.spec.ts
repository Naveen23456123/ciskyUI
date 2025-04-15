import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqTransportationComponent } from './add-boq-transportation.component';

describe('AddBoqTransportationComponent', () => {
  let component: AddBoqTransportationComponent;
  let fixture: ComponentFixture<AddBoqTransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqTransportationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

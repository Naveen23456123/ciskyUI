import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqTransportationComponent } from './edit-boq-transportation.component';

describe('EditBoqTransportationComponent', () => {
  let component: EditBoqTransportationComponent;
  let fixture: ComponentFixture<EditBoqTransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqTransportationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

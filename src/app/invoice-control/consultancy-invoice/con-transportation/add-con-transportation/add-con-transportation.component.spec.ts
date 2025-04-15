import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConTransportationComponent } from './add-con-transportation.component';

describe('AddConTransportationComponent', () => {
  let component: AddConTransportationComponent;
  let fixture: ComponentFixture<AddConTransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConTransportationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

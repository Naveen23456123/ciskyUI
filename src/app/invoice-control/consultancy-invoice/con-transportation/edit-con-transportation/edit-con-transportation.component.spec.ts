import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConTransportationComponent } from './edit-con-transportation.component';

describe('EditConTransportationComponent', () => {
  let component: EditConTransportationComponent;
  let fixture: ComponentFixture<EditConTransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConTransportationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

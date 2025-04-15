import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqTransportationComponent } from './delete-boq-transportation.component';

describe('DeleteBoqTransportationComponent', () => {
  let component: DeleteBoqTransportationComponent;
  let fixture: ComponentFixture<DeleteBoqTransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqTransportationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

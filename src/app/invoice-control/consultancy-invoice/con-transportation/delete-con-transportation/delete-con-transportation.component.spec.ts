import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConTransportationComponent } from './delete-con-transportation.component';

describe('DeleteConTransportationComponent', () => {
  let component: DeleteConTransportationComponent;
  let fixture: ComponentFixture<DeleteConTransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConTransportationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

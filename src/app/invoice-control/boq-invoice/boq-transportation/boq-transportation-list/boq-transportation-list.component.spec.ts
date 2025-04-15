import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqTransportationListComponent } from './boq-transportation-list.component';

describe('BoqTransportationListComponent', () => {
  let component: BoqTransportationListComponent;
  let fixture: ComponentFixture<BoqTransportationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqTransportationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqTransportationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

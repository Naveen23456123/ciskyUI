import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConTransportationListComponent } from './con-transportation-list.component';

describe('ConTransportationListComponent', () => {
  let component: ConTransportationListComponent;
  let fixture: ComponentFixture<ConTransportationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConTransportationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConTransportationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

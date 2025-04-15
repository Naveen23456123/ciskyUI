import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConDutyTravelListComponent } from './con-duty-travel-list.component';

describe('ConDutyTravelListComponent', () => {
  let component: ConDutyTravelListComponent;
  let fixture: ComponentFixture<ConDutyTravelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConDutyTravelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConDutyTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

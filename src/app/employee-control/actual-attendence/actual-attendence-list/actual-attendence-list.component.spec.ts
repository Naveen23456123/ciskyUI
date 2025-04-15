import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualAttendenceListComponent } from './actual-attendence-list.component';

describe('ActualAttendenceListComponent', () => {
  let component: ActualAttendenceListComponent;
  let fixture: ComponentFixture<ActualAttendenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualAttendenceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualAttendenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

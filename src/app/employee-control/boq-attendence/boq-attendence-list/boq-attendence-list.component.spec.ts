import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqAttendenceListComponent } from './boq-attendence-list.component';

describe('BoqAttendenceListComponent', () => {
  let component: BoqAttendenceListComponent;
  let fixture: ComponentFixture<BoqAttendenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqAttendenceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqAttendenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

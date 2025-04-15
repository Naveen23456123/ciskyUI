import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularListComponent } from './circular-list.component';

describe('CircularListComponent', () => {
  let component: CircularListComponent;
  let fixture: ComponentFixture<CircularListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircularListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

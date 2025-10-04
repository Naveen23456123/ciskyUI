import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImperestComponent } from './view-imperest.component';

describe('ViewImperestComponent', () => {
  let component: ViewImperestComponent;
  let fixture: ComponentFixture<ViewImperestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewImperestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewImperestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

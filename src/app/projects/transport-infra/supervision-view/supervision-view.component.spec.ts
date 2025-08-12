import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionViewComponent } from './supervision-view.component';

describe('SupervisionViewComponent', () => {
  let component: SupervisionViewComponent;
  let fixture: ComponentFixture<SupervisionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupervisionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

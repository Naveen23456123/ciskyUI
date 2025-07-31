import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpDetailsInfoComponent } from './view-exp-details-info.component';

describe('ViewExpDetailsInfoComponent', () => {
  let component: ViewExpDetailsInfoComponent;
  let fixture: ComponentFixture<ViewExpDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewExpDetailsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExpDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

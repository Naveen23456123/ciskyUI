import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficeDetailsComponent } from './view-office-details.component';

describe('ViewOfficeDetailsComponent', () => {
  let component: ViewOfficeDetailsComponent;
  let fixture: ComponentFixture<ViewOfficeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOfficeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

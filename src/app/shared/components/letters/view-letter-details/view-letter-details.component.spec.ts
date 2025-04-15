import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLetterDetailsComponent } from './view-letter-details.component';

describe('ViewLetterDetailsComponent', () => {
  let component: ViewLetterDetailsComponent;
  let fixture: ComponentFixture<ViewLetterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLetterDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLetterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

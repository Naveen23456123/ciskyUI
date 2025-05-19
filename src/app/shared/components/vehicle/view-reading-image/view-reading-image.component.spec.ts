import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReadingImageComponent } from './view-reading-image.component';

describe('ViewReadingImageComponent', () => {
  let component: ViewReadingImageComponent;
  let fixture: ComponentFixture<ViewReadingImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReadingImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReadingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachLetterComponent } from './attach-letter.component';

describe('AttachLetterComponent', () => {
  let component: AttachLetterComponent;
  let fixture: ComponentFixture<AttachLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfReadComponent } from './pdf-read.component';

describe('PdfReadComponent', () => {
  let component: PdfReadComponent;
  let fixture: ComponentFixture<PdfReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

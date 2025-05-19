import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLetterDocComponent } from './delete-letter-doc.component';

describe('DeleteLetterDocComponent', () => {
  let component: DeleteLetterDocComponent;
  let fixture: ComponentFixture<DeleteLetterDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteLetterDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLetterDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

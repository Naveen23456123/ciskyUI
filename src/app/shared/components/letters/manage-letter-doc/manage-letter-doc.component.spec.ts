import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLetterDocComponent } from './manage-letter-doc.component';

describe('ManageLetterDocComponent', () => {
  let component: ManageLetterDocComponent;
  let fixture: ComponentFixture<ManageLetterDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageLetterDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLetterDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

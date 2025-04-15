import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsultantAccountComponent } from './edit-consultant-account.component';

describe('EditConsultantAccountComponent', () => {
  let component: EditConsultantAccountComponent;
  let fixture: ComponentFixture<EditConsultantAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConsultantAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConsultantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

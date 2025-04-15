import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultantAccountComponent } from './add-consultant-account.component';

describe('AddConsultantAccountComponent', () => {
  let component: AddConsultantAccountComponent;
  let fixture: ComponentFixture<AddConsultantAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConsultantAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConsultantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantAccountListComponent } from './consultant-account-list.component';

describe('ConsultantAccountListComponent', () => {
  let component: ConsultantAccountListComponent;
  let fixture: ComponentFixture<ConsultantAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultantAccountListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

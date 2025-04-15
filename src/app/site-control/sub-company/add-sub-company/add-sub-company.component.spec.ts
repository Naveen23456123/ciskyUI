import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCompanyComponent } from './add-sub-company.component';

describe('AddSubCompanyComponent', () => {
  let component: AddSubCompanyComponent;
  let fixture: ComponentFixture<AddSubCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

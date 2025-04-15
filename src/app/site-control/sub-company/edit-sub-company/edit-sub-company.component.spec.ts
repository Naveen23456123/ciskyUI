import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubCompanyComponent } from './edit-sub-company.component';

describe('EditSubCompanyComponent', () => {
  let component: EditSubCompanyComponent;
  let fixture: ComponentFixture<EditSubCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSubCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

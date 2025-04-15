import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubCompanyComponent } from './delete-sub-company.component';

describe('DeleteSubCompanyComponent', () => {
  let component: DeleteSubCompanyComponent;
  let fixture: ComponentFixture<DeleteSubCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSubCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSubCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

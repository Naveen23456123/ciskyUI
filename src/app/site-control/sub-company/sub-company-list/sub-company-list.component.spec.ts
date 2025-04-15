import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCompanyListComponent } from './sub-company-list.component';

describe('SubCompanyListComponent', () => {
  let component: SubCompanyListComponent;
  let fixture: ComponentFixture<SubCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCompanyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

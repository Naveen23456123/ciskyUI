import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherIncomeListComponent } from './other-income-list.component';

describe('OtherIncomeListComponent', () => {
  let component: OtherIncomeListComponent;
  let fixture: ComponentFixture<OtherIncomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherIncomeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherIncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

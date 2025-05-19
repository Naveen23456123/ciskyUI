import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEmployeesComponent } from './item-employees.component';

describe('ItemEmployeesComponent', () => {
  let component: ItemEmployeesComponent;
  let fixture: ComponentFixture<ItemEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

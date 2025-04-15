import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConOfcSupplyComponent } from './add-con-ofc-supply.component';

describe('AddConOfcSupplyComponent', () => {
  let component: AddConOfcSupplyComponent;
  let fixture: ComponentFixture<AddConOfcSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConOfcSupplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConOfcSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConOfcSupplyComponent } from './edit-con-ofc-supply.component';

describe('EditConOfcSupplyComponent', () => {
  let component: EditConOfcSupplyComponent;
  let fixture: ComponentFixture<EditConOfcSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConOfcSupplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConOfcSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

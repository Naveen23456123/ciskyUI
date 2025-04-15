import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConOfcSupplyComponent } from './delete-con-ofc-supply.component';

describe('DeleteConOfcSupplyComponent', () => {
  let component: DeleteConOfcSupplyComponent;
  let fixture: ComponentFixture<DeleteConOfcSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConOfcSupplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConOfcSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

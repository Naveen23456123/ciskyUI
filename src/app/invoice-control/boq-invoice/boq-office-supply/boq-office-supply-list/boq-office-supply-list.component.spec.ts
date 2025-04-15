import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqOfficeSupplyListComponent } from './boq-office-supply-list.component';

describe('BoqOfficeSupplyListComponent', () => {
  let component: BoqOfficeSupplyListComponent;
  let fixture: ComponentFixture<BoqOfficeSupplyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqOfficeSupplyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqOfficeSupplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

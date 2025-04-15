import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorCosAddComponent } from './contractor-cos-add.component';

describe('ContractorCosAddComponent', () => {
  let component: ContractorCosAddComponent;
  let fixture: ComponentFixture<ContractorCosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorCosAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorCosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorCosEditComponent } from './contractor-cos-edit.component';

describe('ContractorCosEditComponent', () => {
  let component: ContractorCosEditComponent;
  let fixture: ComponentFixture<ContractorCosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorCosEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorCosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

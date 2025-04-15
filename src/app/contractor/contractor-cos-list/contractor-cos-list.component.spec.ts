import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorCosListComponent } from './contractor-cos-list.component';

describe('ContractorCosListComponent', () => {
  let component: ContractorCosListComponent;
  let fixture: ComponentFixture<ContractorCosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorCosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorCosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

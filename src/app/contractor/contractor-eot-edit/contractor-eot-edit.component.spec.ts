import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorEotEditComponent } from './contractor-eot-edit.component';

describe('ContractorEotEditComponent', () => {
  let component: ContractorEotEditComponent;
  let fixture: ComponentFixture<ContractorEotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorEotEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorEotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

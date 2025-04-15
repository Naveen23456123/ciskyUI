import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorLetterEditComponent } from './contractor-letter-edit.component';

describe('ContractorLetterEditComponent', () => {
  let component: ContractorLetterEditComponent;
  let fixture: ComponentFixture<ContractorLetterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorLetterEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorLetterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

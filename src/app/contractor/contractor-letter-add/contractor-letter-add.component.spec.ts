import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorLetterAddComponent } from './contractor-letter-add.component';

describe('ContractorLetterAddComponent', () => {
  let component: ContractorLetterAddComponent;
  let fixture: ComponentFixture<ContractorLetterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorLetterAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorLetterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

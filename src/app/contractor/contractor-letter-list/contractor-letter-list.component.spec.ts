import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorLetterListComponent } from './contractor-letter-list.component';

describe('ContractorLetterListComponent', () => {
  let component: ContractorLetterListComponent;
  let fixture: ComponentFixture<ContractorLetterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorLetterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorLetterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

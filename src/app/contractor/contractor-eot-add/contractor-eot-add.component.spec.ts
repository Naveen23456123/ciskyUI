import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorEotAddComponent } from './contractor-eot-add.component';

describe('ContractorEotAddComponent', () => {
  let component: ContractorEotAddComponent;
  let fixture: ComponentFixture<ContractorEotAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorEotAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorEotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

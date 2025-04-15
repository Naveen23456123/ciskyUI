import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorEotListComponent } from './contractor-eot-list.component';

describe('ContractorEotListComponent', () => {
  let component: ContractorEotListComponent;
  let fixture: ComponentFixture<ContractorEotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorEotListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorEotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

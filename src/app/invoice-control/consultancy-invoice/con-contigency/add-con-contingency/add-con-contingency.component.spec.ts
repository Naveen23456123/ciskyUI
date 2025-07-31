import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConContingencyComponent } from './add-con-contingency.component';

describe('AddConContingencyComponent', () => {
  let component: AddConContingencyComponent;
  let fixture: ComponentFixture<AddConContingencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConContingencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConContingencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

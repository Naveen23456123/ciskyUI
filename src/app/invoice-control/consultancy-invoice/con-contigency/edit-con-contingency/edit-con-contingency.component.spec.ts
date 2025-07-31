import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConContingencyComponent } from './edit-con-contingency.component';

describe('EditConContingencyComponent', () => {
  let component: EditConContingencyComponent;
  let fixture: ComponentFixture<EditConContingencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConContingencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConContingencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

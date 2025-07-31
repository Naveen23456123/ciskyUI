import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConContingencyComponent } from './delete-con-contingency.component';

describe('DeleteConContingencyComponent', () => {
  let component: DeleteConContingencyComponent;
  let fixture: ComponentFixture<DeleteConContingencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConContingencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConContingencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

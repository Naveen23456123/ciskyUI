import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmployeeDocComponent } from './delete-employee-doc.component';

describe('DeleteEmployeeDocComponent', () => {
  let component: DeleteEmployeeDocComponent;
  let fixture: ComponentFixture<DeleteEmployeeDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEmployeeDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEmployeeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

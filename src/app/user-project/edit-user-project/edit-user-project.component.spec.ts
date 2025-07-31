import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProjectComponent } from './edit-user-project.component';

describe('EditUserProjectComponent', () => {
  let component: EditUserProjectComponent;
  let fixture: ComponentFixture<EditUserProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

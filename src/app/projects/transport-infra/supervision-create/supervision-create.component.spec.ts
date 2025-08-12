import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionCreateComponent } from './supervision-create.component';

describe('SupervisionCreateComponent', () => {
  let component: SupervisionCreateComponent;
  let fixture: ComponentFixture<SupervisionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupervisionCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

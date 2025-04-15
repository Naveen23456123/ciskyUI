import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConsultantAccountComponent } from './delete-consultant-account.component';

describe('DeleteConsultantAccountComponent', () => {
  let component: DeleteConsultantAccountComponent;
  let fixture: ComponentFixture<DeleteConsultantAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConsultantAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConsultantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

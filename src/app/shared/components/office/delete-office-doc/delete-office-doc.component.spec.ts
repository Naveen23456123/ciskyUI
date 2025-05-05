import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOfficeDocComponent } from './delete-office-doc.component';

describe('DeleteOfficeDocComponent', () => {
  let component: DeleteOfficeDocComponent;
  let fixture: ComponentFixture<DeleteOfficeDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteOfficeDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOfficeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

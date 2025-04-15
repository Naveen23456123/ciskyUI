import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManageBtnComponent } from './document-manage-btn.component';

describe('DocumentManageBtnComponent', () => {
  let component: DocumentManageBtnComponent;
  let fixture: ComponentFixture<DocumentManageBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentManageBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentManageBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

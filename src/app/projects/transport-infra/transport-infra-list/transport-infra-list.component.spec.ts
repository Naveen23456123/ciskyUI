import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportInfraListComponent } from './transport-infra-list.component';

describe('TransportInfraListComponent', () => {
  let component: TransportInfraListComponent;
  let fixture: ComponentFixture<TransportInfraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportInfraListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportInfraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

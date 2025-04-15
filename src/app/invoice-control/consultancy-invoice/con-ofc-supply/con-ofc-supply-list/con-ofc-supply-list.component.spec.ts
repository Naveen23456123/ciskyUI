import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConOfcSupplyListComponent } from './con-ofc-supply-list.component';

describe('ConOfcSupplyListComponent', () => {
  let component: ConOfcSupplyListComponent;
  let fixture: ComponentFixture<ConOfcSupplyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConOfcSupplyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConOfcSupplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

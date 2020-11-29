import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InducedTransactionComponent } from './induced-transaction.component';

describe('InducedTransactionComponent', () => {
  let component: InducedTransactionComponent;
  let fixture: ComponentFixture<InducedTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InducedTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InducedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

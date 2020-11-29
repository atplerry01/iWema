import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAlertHqComponent } from './expense-alert-hq.component';

describe('ExpenseAlertHqComponent', () => {
  let component: ExpenseAlertHqComponent;
  let fixture: ComponentFixture<ExpenseAlertHqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseAlertHqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseAlertHqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

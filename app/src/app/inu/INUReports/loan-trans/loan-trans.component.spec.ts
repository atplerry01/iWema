import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTransComponent } from './loan-trans.component';

describe('LoanTransComponent', () => {
  let component: LoanTransComponent;
  let fixture: ComponentFixture<LoanTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

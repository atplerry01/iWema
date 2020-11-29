import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsOpenedComponent } from './accounts-opened.component';

describe('AccountsOpenedComponent', () => {
  let component: AccountsOpenedComponent;
  let fixture: ComponentFixture<AccountsOpenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsOpenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsOpenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

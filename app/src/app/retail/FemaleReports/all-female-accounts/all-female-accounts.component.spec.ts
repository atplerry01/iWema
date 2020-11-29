import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFemaleAccountsComponent } from './all-female-accounts.component';

describe('AllFemaleAccountsComponent', () => {
  let component: AllFemaleAccountsComponent;
  let fixture: ComponentFixture<AllFemaleAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFemaleAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFemaleAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

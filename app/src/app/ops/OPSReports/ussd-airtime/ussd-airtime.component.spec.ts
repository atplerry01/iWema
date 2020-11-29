import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdAirtimeComponent } from './ussd-airtime.component';

describe('UssdAirtimeComponent', () => {
  let component: UssdAirtimeComponent;
  let fixture: ComponentFixture<UssdAirtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UssdAirtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdAirtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

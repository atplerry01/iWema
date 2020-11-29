import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegNotificationComponent } from './admin-reg-notification.component';

describe('AdminRegNotificationComponent', () => {
  let component: AdminRegNotificationComponent;
  let fixture: ComponentFixture<AdminRegNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

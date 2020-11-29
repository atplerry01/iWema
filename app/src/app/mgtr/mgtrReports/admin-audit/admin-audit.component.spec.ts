import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuditComponent } from './admin-audit.component';

describe('AdminAuditComponent', () => {
  let component: AdminAuditComponent;
  let fixture: ComponentFixture<AdminAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegulatoryComponent } from './admin-regulatory.component';

describe('AdminRegulatoryComponent', () => {
  let component: AdminRegulatoryComponent;
  let fixture: ComponentFixture<AdminRegulatoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegulatoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegulatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

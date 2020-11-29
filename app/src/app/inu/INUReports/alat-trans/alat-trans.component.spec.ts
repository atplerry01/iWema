import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlatTransComponent } from './alat-trans.component';

describe('AlatTransComponent', () => {
  let component: AlatTransComponent;
  let fixture: ComponentFixture<AlatTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlatTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlatTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

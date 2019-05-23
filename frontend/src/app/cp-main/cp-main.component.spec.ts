import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpMainComponent } from './cp-main.component';

describe('CpMainComponent', () => {
  let component: CpMainComponent;
  let fixture: ComponentFixture<CpMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

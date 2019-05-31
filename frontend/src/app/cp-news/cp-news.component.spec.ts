import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpNewsComponent } from './cp-news.component';

describe('CpNewsComponent', () => {
  let component: CpNewsComponent;
  let fixture: ComponentFixture<CpNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

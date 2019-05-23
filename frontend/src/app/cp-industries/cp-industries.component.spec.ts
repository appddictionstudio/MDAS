import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpIndustriesComponent } from './cp-industries.component';

describe('CpIndustriesComponent', () => {
  let component: CpIndustriesComponent;
  let fixture: ComponentFixture<CpIndustriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpIndustriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpIndustriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

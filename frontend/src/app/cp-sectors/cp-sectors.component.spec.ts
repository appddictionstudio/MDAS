import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpSectorsComponent } from './cp-sectors.component';

describe('CpSectorsComponent', () => {
  let component: CpSectorsComponent;
  let fixture: ComponentFixture<CpSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

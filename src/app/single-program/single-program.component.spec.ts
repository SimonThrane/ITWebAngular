import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProgramComponent } from './single-program.component';

describe('SingleProgramComponent', () => {
  let component: SingleProgramComponent;
  let fixture: ComponentFixture<SingleProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

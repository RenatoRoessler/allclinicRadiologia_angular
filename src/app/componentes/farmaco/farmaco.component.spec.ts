import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmacoComponent } from './farmaco.component';

describe('FarmacoComponent', () => {
  let component: FarmacoComponent;
  let fixture: ComponentFixture<FarmacoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmacoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

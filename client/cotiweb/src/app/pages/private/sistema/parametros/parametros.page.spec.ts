import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosPage } from './parametros.page';

describe('ParametrosPage', () => {
  let component: ParametrosPage;
  let fixture: ComponentFixture<ParametrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

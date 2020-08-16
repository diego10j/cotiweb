import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiListaPage } from './mi-lista.page';

describe('MiListaPage', () => {
  let component: MiListaPage;
  let fixture: ComponentFixture<MiListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

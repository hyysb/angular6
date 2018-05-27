import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrivebFormsComponent } from './template-driveb-forms.component';

describe('TemplateDrivebFormsComponent', () => {
  let component: TemplateDrivebFormsComponent;
  let fixture: ComponentFixture<TemplateDrivebFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDrivebFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDrivebFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

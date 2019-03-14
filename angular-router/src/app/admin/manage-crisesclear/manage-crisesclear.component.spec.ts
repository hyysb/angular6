import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCrisesclearComponent } from './manage-crisesclear.component';

describe('ManageCrisesclearComponent', () => {
  let component: ManageCrisesclearComponent;
  let fixture: ComponentFixture<ManageCrisesclearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCrisesclearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCrisesclearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

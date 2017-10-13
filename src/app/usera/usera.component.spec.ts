import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraComponent } from './usera.component';

describe('UseraComponent', () => {
  let component: UseraComponent;
  let fixture: ComponentFixture<UseraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

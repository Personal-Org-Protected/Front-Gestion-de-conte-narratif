import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenExceptionComponent } from './forbidden-exception.component';

describe('ForbiddenExceptionComponent', () => {
  let component: ForbiddenExceptionComponent;
  let fixture: ComponentFixture<ForbiddenExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbiddenExceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForbiddenExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

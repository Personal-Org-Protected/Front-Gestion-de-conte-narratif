import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenOperationExceptionComponent } from './forbidden-operation-exception.component';

describe('ForbiddenOperationExceptionComponent', () => {
  let component: ForbiddenOperationExceptionComponent;
  let fixture: ComponentFixture<ForbiddenOperationExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbiddenOperationExceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForbiddenOperationExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

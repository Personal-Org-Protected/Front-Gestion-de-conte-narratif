import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLambdaComponent } from './user-lambda.component';

describe('UserLambdaComponent', () => {
  let component: UserLambdaComponent;
  let fixture: ComponentFixture<UserLambdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLambdaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLambdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

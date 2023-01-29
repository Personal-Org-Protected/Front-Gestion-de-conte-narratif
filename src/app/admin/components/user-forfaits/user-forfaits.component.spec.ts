import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForfaitsComponent } from './user-forfaits.component';

describe('UserForfaitsComponent', () => {
  let component: UserForfaitsComponent;
  let fixture: ComponentFixture<UserForfaitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserForfaitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserForfaitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

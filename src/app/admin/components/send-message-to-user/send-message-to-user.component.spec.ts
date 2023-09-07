import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageToUserComponent } from './send-message-to-user.component';

describe('SendMessageToUserComponent', () => {
  let component: SendMessageToUserComponent;
  let fixture: ComponentFixture<SendMessageToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessageToUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessageToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

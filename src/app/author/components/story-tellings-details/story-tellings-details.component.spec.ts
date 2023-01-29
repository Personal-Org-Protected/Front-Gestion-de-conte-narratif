import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTellingsDetailsComponent } from './story-tellings-details.component';

describe('StoryTellingsDetailsComponent', () => {
  let component: StoryTellingsDetailsComponent;
  let fixture: ComponentFixture<StoryTellingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryTellingsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryTellingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTellingsComponent } from './story-tellings.component';

describe('StoryTellingsComponent', () => {
  let component: StoryTellingsComponent;
  let fixture: ComponentFixture<StoryTellingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryTellingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryTellingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCreationComponent } from './story-creation.component';

describe('StoryCreationComponent', () => {
  let component: StoryCreationComponent;
  let fixture: ComponentFixture<StoryCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

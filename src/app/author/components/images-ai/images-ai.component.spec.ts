import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesAIComponent } from './images-ai.component';

describe('ImagesAIComponent', () => {
  let component: ImagesAIComponent;
  let fixture: ComponentFixture<ImagesAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesAIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

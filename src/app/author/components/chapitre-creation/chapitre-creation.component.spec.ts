import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapitreCreationComponent } from './chapitre-creation.component';

describe('ChapitreCreationComponent', () => {
  let component: ChapitreCreationComponent;
  let fixture: ComponentFixture<ChapitreCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapitreCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapitreCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

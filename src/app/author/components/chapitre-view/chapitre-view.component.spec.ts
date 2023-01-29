import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapitreViewComponent } from './chapitre-view.component';

describe('ChapitreViewComponent', () => {
  let component: ChapitreViewComponent;
  let fixture: ComponentFixture<ChapitreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapitreViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapitreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

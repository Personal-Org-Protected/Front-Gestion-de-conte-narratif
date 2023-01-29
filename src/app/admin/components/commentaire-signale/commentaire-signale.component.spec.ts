import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireSignaleComponent } from './commentaire-signale.component';

describe('CommentaireSignaleComponent', () => {
  let component: CommentaireSignaleComponent;
  let fixture: ComponentFixture<CommentaireSignaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentaireSignaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentaireSignaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { StoryTellCreationComponent } from './components/story-tell-creation/story-tell-creation.component';
import { ChapitreCreationComponent } from './components/chapitre-creation/chapitre-creation.component';
import { ImageCreationComponent } from './components/image-creation/image-creation.component';
import { StoryCreationComponent } from './components/story-creation/story-creation.component';
import { ChapitresComponent } from './components/chapitres/chapitres.component';
import { StoryTellingsComponent } from './components/story-tellings/story-tellings.component';
import { StoryModificationComponent } from './components/story-modification/story-modification.component';
import { StoryTellModificationComponent } from './components/story-tell-modification/story-tell-modification.component';
import { ImageModificationComponent } from './components/image-modification/image-modification.component';
import { ImagesComponent } from './components/images/images.component';
import { ImagesAIComponent } from './components/images-ai/images-ai.component';
import { SharedModule } from '../shared/shared.module';
import { StoryTellingsDetailsComponent } from './components/story-tellings-details/story-tellings-details.component';
import { DialogIdeaElementsComponent } from './components/dialog-idea-elements/dialog-idea-elements.component';
import { ChapitreViewComponent } from './components/chapitre-view/chapitre-view.component';
import { DialogImageChoiceComponent } from './components/dialog-image-choice/dialog-image-choice.component';


@NgModule({
  declarations: [
    AuthorComponent,
    StoryTellCreationComponent,
    ChapitreCreationComponent,
    ImageCreationComponent,
    StoryCreationComponent,
    ChapitresComponent,
    StoryTellingsComponent,
    StoryModificationComponent,
    StoryTellModificationComponent,
    ImageModificationComponent,
    ImagesComponent,
    ImagesAIComponent,
    StoryTellingsDetailsComponent,
    DialogIdeaElementsComponent,
    ChapitreViewComponent,
    DialogImageChoiceComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    SharedModule
  ]
})
export class AuthorModule { }

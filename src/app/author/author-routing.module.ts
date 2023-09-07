import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthorGuard } from '../core/guards/is-author.guard';
import { AuthorComponent } from './author.component';
import { ChapitreCreationComponent } from './components/chapitre-creation/chapitre-creation.component';
import { ChapitreViewComponent } from './components/chapitre-view/chapitre-view.component';
import { ChapitresComponent } from './components/chapitres/chapitres.component';
import { ImageCreationComponent } from './components/image-creation/image-creation.component';
import { ImageModificationComponent } from './components/image-modification/image-modification.component';
import { ImagesAIComponent } from './components/images-ai/images-ai.component';
import { ImagesComponent } from './components/images/images.component';
import { StoryCreationComponent } from './components/story-creation/story-creation.component';
import { StoryModificationComponent } from './components/story-modification/story-modification.component';
import { StoryTellCreationComponent } from './components/story-tell-creation/story-tell-creation.component';
import { StoryTellModificationComponent } from './components/story-tell-modification/story-tell-modification.component';
import { StoryTellingsDetailsComponent } from './components/story-tellings-details/story-tellings-details.component';
import { StoryTellingsComponent } from './components/story-tellings/story-tellings.component';
import { AuthorAccessGuard } from '../core/guards/author-access.guard';

const routes: Routes = [
{path:'',
children:[
  {path:'Histoires',component:StoryTellingsComponent},
  {path:'Histoire-details/:id',component:StoryTellingsDetailsComponent,canActivate:[AuthorAccessGuard]},
  {path:'Histoire-creation',component:StoryTellCreationComponent,canActivate:[AuthorAccessGuard]},
  {path:'Histoire-modification/:id',component:StoryTellModificationComponent,canActivate:[AuthorAccessGuard]},
  {path:'Chapitres/:id',component:ChapitresComponent,canActivate:[AuthorAccessGuard]},
  {path:'Chapitre-view/:id',component:ChapitreViewComponent,canActivate:[AuthorAccessGuard]},
  {path:'Chapitre-creation/:id',component:ChapitreCreationComponent,canActivate:[AuthorAccessGuard]},
  {path:'Story-creation',component:StoryCreationComponent,canActivate:[AuthorAccessGuard]},
  {path:'Story-modification/:id',component:StoryModificationComponent,canActivate:[AuthorAccessGuard]},
  {path:'Images-librairie',component:ImagesComponent},
  {path:'Images-creation',component:ImageCreationComponent,canActivate:[AuthorAccessGuard]},
  {path:'Images-modification/:id',component:ImageModificationComponent,canActivate:[AuthorAccessGuard]},
  {path:'Images-ai-librairie',component:ImagesAIComponent}
],canActivate:[IsAuthorGuard]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }

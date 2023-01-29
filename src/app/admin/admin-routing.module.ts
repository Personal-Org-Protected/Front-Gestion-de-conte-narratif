import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommentaireSignaleComponent } from './components/commentaire-signale/commentaire-signale.component';
import { ForfaitCreationComponent } from './components/forfait-creation/forfait-creation.component';
import { ForfaitModificationComponent } from './components/forfait-modification/forfait-modification.component';
import { ForfaitsComponent } from './components/forfaits/forfaits.component';
import { TagCreationComponent } from './components/tag-creation/tag-creation.component';
import { TagModificationComponent } from './components/tag-modification/tag-modification.component';
import { TagsComponent } from './components/tags/tags.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserForfaitsComponent } from './components/user-forfaits/user-forfaits.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'',
children:[
  {path:'Users-liste',component:UsersComponent},
  {path:'User-details/:user_id',component:UserDetailsComponent},
  {path:'User-forfaits/:user_id',component:UserForfaitsComponent},
  {path:'Tags',component:TagsComponent},
  {path:'Tag-creation',component:TagCreationComponent},
  {path:'Tag-modification/:id',component:TagModificationComponent},
  {path:'Forfaits',component:ForfaitsComponent},
  {path:'Forfait-creation',component:ForfaitCreationComponent},
  {path:'Forfait-modification/:id',component:ForfaitModificationComponent},
  {path:'Commentaires',component:CommentaireSignaleComponent}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { ForfaitCreationComponent } from './components/forfait-creation/forfait-creation.component';
import { ForfaitModificationComponent } from './components/forfait-modification/forfait-modification.component';
import { UserForfaitsComponent } from './components/user-forfaits/user-forfaits.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CommentaireSignaleComponent } from './components/commentaire-signale/commentaire-signale.component';
import { TagsComponent } from './components/tags/tags.component';
import { ForfaitsComponent } from './components/forfaits/forfaits.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '../shared/shared.module';
import { TagCreationComponent } from './components/tag-creation/tag-creation.component';
import { TagModificationComponent } from './components/tag-modification/tag-modification.component';
//import {MatFormFieldModule} from '@angular/material/form-field'; 


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    ForfaitCreationComponent,
    ForfaitModificationComponent,
    UserForfaitsComponent,
    UserDetailsComponent,
    CommentaireSignaleComponent,
    TagsComponent,
    ForfaitsComponent,
    TagCreationComponent,
    TagModificationComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }

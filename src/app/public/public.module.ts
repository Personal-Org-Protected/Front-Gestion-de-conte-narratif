import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import { PublicHomeComponent } from './components/public-home/public-home.component'; 
import {MatButtonModule} from '@angular/material/button';

import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { ModusOperandiComponent } from './components/modus-operandi/modus-operandi.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectComponent } from './components/project/project.component'; 
import { RouterModule } from '@angular/router';
import { ForfaitComponent } from './components/forfait/forfait.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';

@NgModule({
  declarations: [
    PublicComponent,
    PublicHomeComponent,
    ModusOperandiComponent,
    AboutUsComponent,
    ContactComponent,
    ProjectComponent,
    ForfaitComponent,
    UserCreationComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports:[

  ]
})
export class PublicModule { }

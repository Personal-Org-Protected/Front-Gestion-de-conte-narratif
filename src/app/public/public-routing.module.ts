import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForfaitComponent } from './components/forfait/forfait.component';

import { ModusOperandiComponent } from './components/modus-operandi/modus-operandi.component';
import { ProjectComponent } from './components/project/project.component';
import { PublicHomeComponent } from './components/public-home/public-home.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { PublicComponent } from './public.component';
import { TrueUserGuard } from '../core/guards/true-user.guard';

const routes: Routes = [
  {path:'',
children:[
 {path:'project',component:ProjectComponent},
  {path:'modus-operandi',component:ModusOperandiComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'contact',component:ContactComponent},
  {path:'forfait/:username',component:ForfaitComponent,canActivate:[AuthGuard]},
  {path:'Signup',component:UserCreationComponent}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

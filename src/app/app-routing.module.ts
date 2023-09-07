import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { UsersComponent } from './admin/components/users/users.component';
import { AuthServicesService } from './core/auth/auth-services.service';
import { IsAdminGuard } from './core/guards/is-admin.guard';
import { TrueUserGuard } from './core/guards/true-user.guard';
import { ProjectComponent } from './public/components/project/project.component';
//import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {path:'Public',component:ProjectComponent},
  {path:'Public',loadChildren:()=>import('./public/public.module').then(m=>m.PublicModule)},
  {path:'Private/:username',loadChildren:()=>import('./private/private.module').then(m=>m.PrivateModule),canActivate:[AuthGuard,TrueUserGuard],canActivateChild:[AuthGuard]},
  {path:'Error',loadChildren:()=>import('./errors-handling/solo-component-module.module').then(m=>m.SoloComponentModuleModule)},
  {path: ' ',   redirectTo: '/Public/project', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { constructor(public auth:AuthServicesService){} getId(){}}

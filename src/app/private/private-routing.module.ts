import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDisplayComponent } from './components/user-display/user-display.component';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {path:'',
children:[
 {path:'User-lambda',loadChildren:()=>import('../user-lambda/user-lambda.module').then(m=>m.UserLambdaModule)},
 {path:'Author',loadChildren:()=>import('../author/author.module').then(m=>m.AuthorModule)},
 {path:'Admin',loadChildren:()=>import('../admin/admin.module').then(m=>m.AdminModule)},
{path:'User-info',component:UserDisplayComponent}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }

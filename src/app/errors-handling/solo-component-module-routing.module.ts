import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from '../public/components/project/project.component';
import { ForbiddenExceptionComponent } from '../shared/components/exceptions/forbidden-exception/forbidden-exception.component';
import { ForbiddenOperationExceptionComponent } from '../shared/components/exceptions/forbidden-operation-exception/forbidden-operation-exception.component';
import { NotFoundExceptionComponent } from '../shared/components/exceptions/not-found-exception/not-found-exception.component';
import { ServerExceptionComponent } from '../shared/components/exceptions/server-exception/server-exception.component';

const routes: Routes = [

{path:'',children:[
  {path:'not-Found',component:NotFoundExceptionComponent},
  {path:'forbidden',component:ForbiddenExceptionComponent},
  {path:'forbidden-operations',component:ForbiddenOperationExceptionComponent},
  {path:'server',component:ServerExceptionComponent},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoloComponentModuleRoutingModule { }

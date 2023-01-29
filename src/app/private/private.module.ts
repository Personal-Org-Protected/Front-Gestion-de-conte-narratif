import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { UserLambdaModule } from '../user-lambda/user-lambda.module';
import { AuthorModule } from '../author/author.module';
import { AdminModule } from '../admin/admin.module';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { CommonService } from './services/common.service';

@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    UserLambdaModule,
    AuthorModule,
    AdminModule
  ],
  exports:[
  SharedModule
  ],
  providers:[
    CommonService
  ]

})
export class PrivateModule { }

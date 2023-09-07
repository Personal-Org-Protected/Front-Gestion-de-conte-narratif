import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { UserLambdaModule } from '../user-lambda/user-lambda.module';
import { AuthorModule } from '../author/author.module';
import { AdminModule } from '../admin/admin.module';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field'; 
import { CommonService } from './services/common.service';
import { UserDisplayComponent } from './components/user-display/user-display.component';
import { DialogImageChoiceComponent } from './components/dialog-image-choice/dialog-image-choice.component';
import { TranslatorService } from './http/General-Services/translator.service';

@NgModule({
  declarations: [
    PrivateComponent,
    UserDisplayComponent,
    DialogImageChoiceComponent,
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
    CommonService,
    TranslatorService
  ]

})
export class PrivateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggingComponent } from './components/logging/logging.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpHeaderInterceptor } from '../core/interceptors/http-header.interceptor';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundExceptionComponent } from './components/exceptions/not-found-exception/not-found-exception.component';
import { ForbiddenExceptionComponent } from './components/exceptions/forbidden-exception/forbidden-exception.component';
import { ForbiddenOperationExceptionComponent } from './components/exceptions/forbidden-operation-exception/forbidden-operation-exception.component';
import { ServerExceptionComponent } from './components/exceptions/server-exception/server-exception.component';

@NgModule({
  declarations: [
    LoggingComponent,
    NavbarComponent,
    NotFoundExceptionComponent,
    ForbiddenExceptionComponent,
    ForbiddenOperationExceptionComponent,
    ServerExceptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ]
  ,exports:[
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    ScrollingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    FontAwesomeModule,
    NotFoundExceptionComponent,
    ForbiddenExceptionComponent,
    ForbiddenOperationExceptionComponent,
    ServerExceptionComponent
  ],

})
export class SharedModule { }

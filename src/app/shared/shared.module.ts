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
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field'; 
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundExceptionComponent } from './components/exceptions/not-found-exception/not-found-exception.component';
import { ForbiddenExceptionComponent } from './components/exceptions/forbidden-exception/forbidden-exception.component';
import { ForbiddenOperationExceptionComponent } from './components/exceptions/forbidden-operation-exception/forbidden-operation-exception.component';
import { ServerExceptionComponent } from './components/exceptions/server-exception/server-exception.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

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
    MatPaginatorModule,
    FontAwesomeModule,
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
    ServerExceptionComponent,
    NgbRatingModule,
    MatProgressSpinnerModule
    
  ],

})
export class SharedModule { }

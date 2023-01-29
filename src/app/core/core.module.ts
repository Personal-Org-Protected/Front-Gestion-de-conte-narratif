import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { interceptorProviders } from './interceptors/interceptor-Config/config_Interceptors';
import { SharedModule } from '../shared/shared.module';
import { AuthServicesService } from './auth/auth-services.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthModule.forRoot(
      {...env.auth,
      cacheLocation:'localstorage'
      },
    ),
    SharedModule
  ],
  exports:[
  ],
  providers:[interceptorProviders,AuthServicesService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}

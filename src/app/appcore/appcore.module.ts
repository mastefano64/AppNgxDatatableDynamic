import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//import { AppErrorHandler } from './error/apperrorhandler';
import { TokenInterceptor } from './service/tokeninterceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    // {
    // provide: ErrorHandler,
    // useClass: AppErrorHandler
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // AuthLoadGuard,
    // AuthActivateGuard
  ]
})
export class AppCoreModule { }

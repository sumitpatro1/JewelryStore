import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SharedModule } from 'primeng/components/common/shared';
import { AuthService } from '@app/services/auth.service';

@NgModule({
  declarations: [
  ],
  imports: [HttpClientModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [AuthService]
    },
    AuthGuard
  ],
  exports: [
  ]
})
export class CoreModule { }

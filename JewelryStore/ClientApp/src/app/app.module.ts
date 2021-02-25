import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@app/shared';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ConfirmationService, DialogService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ComponentsModule } from './components/components.module';
import { AuthService, DashboardService, UserService } from './services';
import { SummaryPopupComponent } from './shared/summary-popup/summary-popup.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    ToastContainerModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ConfirmationService,
    DialogService,
    AuthService,
    DashboardService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SummaryPopupComponent]
})
export class AppModule { }
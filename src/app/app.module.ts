import { LookupService } from './core/lookup.service';
import { DataService } from './core/http/data.service';
import { AuthService } from './core/auth/auth.service';
import { CoreModule } from './core/core.module';
import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { HttpInterceptorService } from './core/http/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCacheService } from './core/request-cache.service';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AccountModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
    CoreModule,
    AdminModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    AuthService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    LookupService,
    RequestCacheService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

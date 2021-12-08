import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RdFakeDatabaseProvider } from './shared/authentication/fakedb/rd-fake-database.interceptor'
import { SharedModule } from './shared/shared.module';
import { UserModule } from './feature/user/user.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy},RdFakeDatabaseProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

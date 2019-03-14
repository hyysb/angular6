import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 路由模块
import { AppRoutingModule } from './app-routing.module';

// 其他页面模块
// import { AdminModule } from './admin/admin.module';
import { HeroesModule } from './hero/hero.module';
import { CrisisCenterModule } from './crisis-center/crisis.module';
import { AuthModule } from './auth/auth.module';

// 相关页面
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
// import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    // LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    // CrisisCenterModule,
    AuthModule,
    // AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
 }

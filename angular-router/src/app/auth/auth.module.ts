import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];
// import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authRoutes)
    // AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {}

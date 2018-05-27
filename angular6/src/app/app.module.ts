import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplateDrivebFormsComponent } from './template-driveb-forms/template-driveb-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivebFormsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

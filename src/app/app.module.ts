import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { LayoutModule } from './modules/layout/layout.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    LayoutModule,
    CurriculumModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue:"pt-BR"
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

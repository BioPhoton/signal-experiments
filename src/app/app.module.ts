import { RxUnpatch } from "@rx-angular/template/unpatch";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ROUTES} from './routes';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RxUnpatch,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

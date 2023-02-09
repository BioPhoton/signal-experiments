import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnpatchModule} from "@rx-angular/template/unpatch";
import { RxLetDirective } from './rx-let.directive';

@NgModule({
  declarations: [
    AppComponent,
    RxLetDirective
  ],
  imports: [
    BrowserModule,
    UnpatchModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

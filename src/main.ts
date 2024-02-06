import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ROUTES } from './app/routes';
import { provideRouter } from '@angular/router';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, RxUnpatch),
        provideRouter(ROUTES)
    ]
})
  .catch(err => console.error(err));

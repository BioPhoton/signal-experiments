import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom, ɵprovideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ROUTES } from './app/routes';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        provideRouter(ROUTES),
        ɵprovideZonelessChangeDetection()
    ]
})
  .catch(err => console.error(err));

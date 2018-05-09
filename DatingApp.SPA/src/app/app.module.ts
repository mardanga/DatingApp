import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ValuesComponent } from './components/Values/Values.component';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ValuesComponent } from './components/Values/Values.component';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertifyService } from './services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap';

import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { MembersComponent } from './components/members/members.component';
import { routes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MembersComponent,
    ListsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

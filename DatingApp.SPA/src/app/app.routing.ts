import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { MembersComponent } from './components/members/members.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'members', component: MembersComponent
  },
  {
    path: 'lists', component: ListsComponent
  },
  {
    path: 'messages', component: MessagesComponent
  },
  {
    path: '**', redirectTo: 'home' , pathMatch: 'full'
  },
];



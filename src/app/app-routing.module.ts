import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SorteoComponent } from './sorteo/sorteo.component';


const routes: Routes = [
	{path: "login", component: LoginComponent},
	{path: "sorteos", component:SorteoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

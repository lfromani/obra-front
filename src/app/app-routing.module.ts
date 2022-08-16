import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';

const routes: Routes = [
  { 
    path: 'login', component: LoginComponent 
  },
  {
    path: '', component: NavComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'produtos', component: ProdutoListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

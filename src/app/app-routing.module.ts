import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';

const routes: Routes = [
  { 
    path: 'login', component: LoginComponent 
  },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'produtos', component: ProdutoListComponent },
      { path: 'produtos/create', component: ProdutoCreateComponent },
      { path: 'produtos/update/:idProduto', component: ProdutoUpdateComponent },
      { path: 'produtos/delete/:idProduto', component: ProdutoDeleteComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

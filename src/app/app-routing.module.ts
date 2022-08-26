import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ObraCreateComponent } from './components/obra/obra-create/obra-create.component';
import { ObraListComponent } from './components/obra/obra-list/obra-list.component';
import { ObraUpdateComponent } from './components/obra/obra-update/obra-update.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { UnidadeMedidaCreateComponent } from './components/unidadeMedida/unidade-medida-create/unidade-medida-create.component';
import { UnidadeMedidaDeleteComponent } from './components/unidadeMedida/unidade-medida-delete/unidade-medida-delete.component';
import { UnidadeMedidaListComponent } from './components/unidadeMedida/unidade-medida-list/unidade-medida-list.component';
import { UnidadeMedidaUpdateComponent } from './components/unidadeMedida/unidade-medida-update/unidade-medida-update.component';

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
      { path: 'produtos/delete/:idProduto', component: ProdutoDeleteComponent },

      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/create', component: ClienteCreateComponent },
      { path: 'clientes/update/:idCliente', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:idCliente', component: ClienteDeleteComponent },

      { path: 'obras', component: ObraListComponent },
      { path: 'obras/create', component: ObraCreateComponent },
      { path: 'obras/update/:idObra', component: ObraUpdateComponent },

      { path: 'unidadesmedida', component: UnidadeMedidaListComponent },
      { path: 'unidadesmedida/create', component: UnidadeMedidaCreateComponent },
      { path: 'unidadesmedida/update/:idUnidadeMedida', component: UnidadeMedidaUpdateComponent },
      { path: 'unidadesmedida/delete/:idUnidadeMedida', component: UnidadeMedidaDeleteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { ProdutoService } from 'src/app/services/produto.service';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    idProduto: '',
    descricao: '',
    quantidade: 0.0,
    preco: 0.0,
    dataCadastro: '',
    idUnidadeMedida: '',
    unidadeMedida: '',
  }

  unidadesMedida: UnidadeMedida[] = [];

  descricao: UntypedFormControl = new UntypedFormControl(null, Validators.required);
  unidadeMedida: UntypedFormControl = new UntypedFormControl(null, Validators.required);

  constructor(
    private service: ProdutoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllUnidadeMedida();
  }

  create(): void {
    this.service.create(this.produto).subscribe(() => {
      this.toast.success('Salvo com sucesso!', 'Produto');
      this.router.navigate(['produtos']);
    }, ex => {
      if (ex.error.errors) {
        ex.erro.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  findAllUnidadeMedida(): void {
    this.unidadeMedidaService.findAll().subscribe(resposta => {
      this.unidadesMedida = resposta;
    })
  }

  validaCampos(): boolean {
    return this.descricao.valid && this.unidadeMedida.valid;
  }

}

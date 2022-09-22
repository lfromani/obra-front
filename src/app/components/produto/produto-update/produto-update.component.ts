import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { ProdutoService } from 'src/app/services/produto.service';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {
  
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

  unidadeMedidaSalva = this.produto.unidadeMedida;

  descricao: FormControl = new FormControl(null, Validators.required);
  unidadeMedida: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: ProdutoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.produto.idProduto = this.route.snapshot.paramMap.get('idProduto');
    this.findById();
    this.findAllUnidadeMedida();
  }

  findById(): void {
    this.service.findById(this.produto.idProduto).subscribe(resposta => {
      this.produto = resposta;
    });
  }

  findAllUnidadeMedida(): void {
    this.unidadeMedidaService.findAll().subscribe(resposta => {
      this.unidadesMedida = resposta;
    })
  }

  update(): void {
    this.service.update(this.produto).subscribe(() => {
      this.toast.success('Atualizado com sucesso!', 'Produto');
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

  validaCampos(): boolean {
    return this.descricao.valid && this.unidadeMedida.valid;
  }

}

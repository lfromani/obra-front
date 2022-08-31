import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovimentoDTO } from 'src/app/dtos/movimentoDTO';
import { Obra } from 'src/app/models/obra';
import { Produto } from 'src/app/models/produto';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ObraService } from 'src/app/services/obra.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-movimento-create',
  templateUrl: './movimento-create.component.html',
  styleUrls: ['./movimento-create.component.css']
})
export class MovimentoCreateComponent implements OnInit {

  movimento: MovimentoDTO = {
    idMovimento: '',
    obra: '',
    produto: '',
    quantidade: '',
    dataLancamento: '',
  }

  obras: Obra[] = [];
  produtos: Produto[] = [];

  obra: FormControl = new FormControl(null, [Validators.required]);
  produto: FormControl = new FormControl(null, [Validators.required]);
  quantidade: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private obraService: ObraService,
    private produtoService: ProdutoService,
    private movimentoService: MovimentoService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllObra();
    this.findAllProduto();
  }

  create(): void {
    this.movimentoService.create(this.movimento).subscribe(resposta => {
      this.toastService.success('Salvo com sucesso', 'Movimento');
      this.router.navigate(['movimentos']);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  findAllObra(): void {
    this.obraService.findAll().subscribe(resposta => {
      this.obras = resposta;
    })
  }

  findAllProduto(): void {
    this.produtoService.findAll().subscribe(resposta => {
      this.produtos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.obra.valid && this.produto.valid && this.quantidade.valid;
  }

}

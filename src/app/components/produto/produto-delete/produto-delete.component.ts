import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {
 
  produto: Produto = {
    idProduto: '',
    descricao: '',
    quantidade: '',
    preco: '',
    dataCadastro: '',
  }

  constructor(
    private service: ProdutoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.produto.idProduto = this.route.snapshot.paramMap.get('idProduto');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.produto.idProduto).subscribe(resposta => {
      this.produto = resposta;
    });
  }

  delete(): void {
    this.service.update(this.produto.idProduto).subscribe(() => {
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

}

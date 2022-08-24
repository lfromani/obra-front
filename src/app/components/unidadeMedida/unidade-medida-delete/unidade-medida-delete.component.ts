import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
  selector: 'app-unidade-medida-delete',
  templateUrl: './unidade-medida-delete.component.html',
  styleUrls: ['./unidade-medida-delete.component.css']
})
export class UnidadeMedidaDeleteComponent implements OnInit {
   
  unidadeMedida: UnidadeMedida = {
    idUnidadeMedida: '',
    descricao: '',
    sigla: '',
  }

  constructor(
    private service: UnidadeMedidaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.unidadeMedida.idUnidadeMedida = this.route.snapshot.paramMap.get('idUnidadeMedida');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.unidadeMedida.idUnidadeMedida).subscribe(resposta => {
      this.unidadeMedida = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.unidadeMedida.idUnidadeMedida).subscribe(() => {
      this.toast.success('Excluído com sucesso!', 'Unidade de Medida');
      this.router.navigate(['unidadesmedida']);
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
import { Component, OnInit } from '@angular/core';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
  selector: 'app-unidade-medida-create',
  templateUrl: './unidade-medida-create.component.html',
  styleUrls: ['./unidade-medida-create.component.css']
})
export class UnidadeMedidaCreateComponent implements OnInit {

  unidadeMedida: UnidadeMedida = {
    idUnidadeMedida: '',
    descricao: '',
    sigla: '',
  }

  descricao: FormControl = new FormControl(null, Validators.required);
  sigla: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: UnidadeMedidaService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.unidadeMedida).subscribe(() => {
      this.toast.success('Salvo com sucesso!', 'Unidade de Medida');
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

  validaCampos(): boolean {
    return this.descricao.valid && this.sigla.valid;
  }
}

import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
  selector: 'app-unidade-medida-update',
  templateUrl: './unidade-medida-update.component.html',
  styleUrls: ['./unidade-medida-update.component.css']
})
export class UnidadeMedidaUpdateComponent implements OnInit {

  unidadeMedida: UnidadeMedida = {
    idUnidadeMedida: '',
    descricao: '',
    sigla: '',
  }

  descricao: UntypedFormControl = new UntypedFormControl(null, Validators.required);
  sigla: UntypedFormControl = new UntypedFormControl(null, Validators.required);

  constructor(
    private service: UnidadeMedidaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.unidadeMedida.idUnidadeMedida = this.route.snapshot.paramMap.get('idUnidadeMedida');
    this.findbyId();
  }

  findbyId(): void {
    this.service.findById(this.unidadeMedida.idUnidadeMedida).subscribe(resposta => {
      this.unidadeMedida = resposta;
    });
  }

  update(): void {
    this.service.update(this.unidadeMedida).subscribe(() => {
      this.toast.success('Atualizado com sucesso!', 'Unidade de Medida');
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

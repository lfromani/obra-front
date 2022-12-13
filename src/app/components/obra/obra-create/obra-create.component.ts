import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Obra } from 'src/app/models/obra';
import { ClienteService } from 'src/app/services/cliente.service';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'app-obra-create',
  templateUrl: './obra-create.component.html',
  styleUrls: ['./obra-create.component.css']
})
export class ObraCreateComponent implements OnInit {

  obra: Obra = {
    idObra: '',
    descricao: '',
    dataCadastro: '',
    observacoes: '',
    idCliente: '',
    nomeCliente: '',
    status: '',
  }

  clientes: Cliente[] = [];

  descricao: UntypedFormControl = new UntypedFormControl(null, [Validators.required]);
  observacoes: UntypedFormControl = new UntypedFormControl(null, [Validators.required]);
  cliente: UntypedFormControl = new UntypedFormControl(null, [Validators.required]);
  status: UntypedFormControl = new UntypedFormControl(null, [Validators.required])

  constructor(
    private obraService: ObraService,
    private clienteService: ClienteService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllCliente();
  }

  create(): void {
    this.obraService.create(this.obra).subscribe(resposta => {
      this.toastService.success('Salvo com sucesso', 'Obra');
      this.router.navigate(['obras']);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  findAllCliente(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  validaCampos(): boolean {
    return this.descricao.valid && this.observacoes.valid && this.cliente.valid && this.status.valid;
  }

}

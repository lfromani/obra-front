import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    idCliente: '',
    nome: '',
    cpf: '',
    dataCadastro: '',
    endereco: '',
    telefone: '',
    email: '',
    dataNascimento: ''
  }

  nome: UntypedFormControl = new UntypedFormControl(null, Validators.required);
  emailFormControl: UntypedFormControl = new UntypedFormControl(null, Validators.email);

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Salvo com sucesso!', 'Cliente');
      this.router.navigate(['clientes']);
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
    return this.nome.valid;
  }

}

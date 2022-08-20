import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
   
  cliente: Cliente = {
    idCliente: '',
    nome: '',
    cpf: '',
    dataCadastro: '',
  }

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.idCliente = this.route.snapshot.paramMap.get('idCliente');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.idCliente).subscribe(resposta => {
      this.cliente = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.idCliente).subscribe(() => {
      this.toast.success('Excluído com sucesso!', 'Cliente');
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

}

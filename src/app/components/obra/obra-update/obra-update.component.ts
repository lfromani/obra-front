import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Obra } from 'src/app/models/obra';
import { ClienteService } from 'src/app/services/cliente.service';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'app-obra-update',
  templateUrl: './obra-update.component.html',
  styleUrls: ['./obra-update.component.css']
})
export class ObraUpdateComponent implements OnInit {

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

  descricao: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private obraService: ObraService,
    private clienteService: ClienteService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.obra.idObra = this.route.snapshot.paramMap.get('idObra');
    this.findById();
    this.findAllClientes();
  }

  update(): void {
    this.obraService.update(this.obra).subscribe(resposta => {
      this.toastService.success('Atualizado com sucesso', 'Obra');
      this.router.navigate(['obras']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findById(): void {
    this.obraService.findById(this.obra.idObra).subscribe(resposta => {
      this.obra = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  validaCampos(): boolean {
    return this.descricao.valid && this.observacoes.valid && this.cliente.valid && this.status.valid;
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

}

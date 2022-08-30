import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Obra } from 'src/app/models/obra';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ObraService } from 'src/app/services/obra.service';
import { MovimentoVO } from 'src/app/vos/movimentoVO';

@Component({
  selector: 'app-movimento-list',
  templateUrl: './movimento-list.component.html',
  styleUrls: ['./movimento-list.component.css']
})

export class MovimentoListComponent implements OnInit {

  obras: Obra[] = [];
  obra: FormControl = new FormControl(null, [Validators.required]);

  ELEMENT_DATA: MovimentoVO[] = [];  

  displayedColumns: string[] = ['idMovimento', 'obra', 'produto', 'quantidade', 'dataLancamento'];
  dataSource = new MatTableDataSource<MovimentoVO>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: MovimentoService,
    private obraService: ObraService,
  ) { }

  ngOnInit(): void {
    this.findAllObra();
  }

  findAllObra(): void {
    this.obraService.findAll().subscribe(resposta => {
      this.obras = resposta;
    })
  }

  consultar(): void {
    this.service.findByIdObra(this.obra.value).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<MovimentoVO>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  validaCampos(): boolean {
    return this.obra.valid;
  }

}

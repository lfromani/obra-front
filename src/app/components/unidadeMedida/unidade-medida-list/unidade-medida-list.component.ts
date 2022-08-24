import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';

@Component({
  selector: 'app-unidade-medida-list',
  templateUrl: './unidade-medida-list.component.html',
  styleUrls: ['./unidade-medida-list.component.css']
})
export class UnidadeMedidaListComponent implements OnInit {

  ELEMENT_DATA: UnidadeMedida[] = [];

  displayedColumns: string[] = ['idUnidadeMedida', 'descricao', 'sigla', 'acoes'];
  dataSource = new MatTableDataSource<UnidadeMedida>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: UnidadeMedidaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }  

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<UnidadeMedida>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

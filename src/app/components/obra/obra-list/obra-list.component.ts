import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Obra } from 'src/app/models/obra';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'app-obra-list',
  templateUrl: './obra-list.component.html',
  styleUrls: ['./obra-list.component.css']
})
export class ObraListComponent implements OnInit {

  ELEMENT_DATA: Obra[] = [];
  FILTERED_DATA: Obra[] = [];

  displayedColumns: string[] = ['idObra', 'descricao', 'dataCadastro', 'idCliente', 'nomeCliente', 'observacoes', 'acoes'];
  dataSource = new MatTableDataSource<Obra>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ObraService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Obra>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO';
    } else if (status == '1') {
      return 'EM ANDAMENTO';
    } else {
      return 'CONCLUÍDO';
    }
  }

  orderByStatus(status: any): void {
    let list: Obra[] = [];
    this.ELEMENT_DATA.forEach(element => {
      /*if (element.status == status) {
        list.push(element);
      }*/
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Obra>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }

}

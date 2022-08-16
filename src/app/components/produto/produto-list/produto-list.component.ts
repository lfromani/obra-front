import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  ELEMENT_DATA: Produto[] = [
    {
      idProduto: 1,
      descricao: 'Parafuso',
      quantidade: '50',
      preco: '1,99',
      dataCadastro: '16/08/2022'
    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'date', 'acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

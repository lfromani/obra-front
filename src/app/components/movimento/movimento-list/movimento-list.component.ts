import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Obra } from 'src/app/models/obra';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ObraService } from 'src/app/services/obra.service';
import { MovimentoVO } from 'src/app/vos/movimentoVO';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-movimento-list',
  templateUrl: './movimento-list.component.html',
  styleUrls: ['./movimento-list.component.css']
})

export class MovimentoListComponent implements OnInit {

  obras: Obra[] = [];
  obraFormControl = new FormControl();
  filteredOptions: Observable<string[]>;

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
    
    this.obras.forEach(element => {
      let i = 0;
      this.filteredOptions[i] = element.descricao;
      i += 1;      
    });

    this.filteredOptions = this.obraFormControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }

  findAllObra(): void {
    this.obraService.findAll().subscribe(resposta => {
      this.obras = resposta;
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.obras.map(x => x.descricao).filter(option => option.toLowerCase().includes(filterValue));
  }

  consultar(): void {
    this.service.findByIdObra(this.obraFormControl.value).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<MovimentoVO>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  validaCampos(): boolean {
    return this.obraFormControl.valid;
  }

}

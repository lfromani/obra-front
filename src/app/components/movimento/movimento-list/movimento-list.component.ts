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
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-movimento-list',
  templateUrl: './movimento-list.component.html',
  styleUrls: ['./movimento-list.component.css']
})

export class MovimentoListComponent implements OnInit {

  obras: Obra[] = [];
  obraFormControl = new FormControl();
  filteredOptions: Observable<string[]>;

  obrasFiltradas: Obra[] = [];
  filteredObras: Observable<Obra[]>;

  ELEMENT_DATA: MovimentoVO[] = [];  

  displayedColumns: string[] = ['idMovimento', 'obra', 'produto', 'quantidade', 'dataLancamento'];
  dataSource = new MatTableDataSource<MovimentoVO>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: MovimentoService,
    private obraService: ObraService,
  ) { }

  async ngOnInit() {
    await this.obraService.findAllPromise().then(data => {
      this.obras = data;
    });

    this.filteredObras = this.obraFormControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }

  private _filter(value: string): Obra[] {
    const filterValue = value;
    //return this.obras.map(x => x.descricao).filter(option => option.toLowerCase().includes(filterValue));
    this.obrasFiltradas = this.obras.filter(o => o.descricao.includes(filterValue));    
    return this.obrasFiltradas;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.consultar(event.option.value);
  }

  consultar(idObra: any): void {
    this.service.findByIdObra(idObra).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<MovimentoVO>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  validaCampos(): boolean {
    return this.obraFormControl.valid;
  }

}

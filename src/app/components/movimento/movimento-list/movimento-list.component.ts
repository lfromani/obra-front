import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { filterOptionsByLabel, Obra } from 'src/app/models/obra';
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

  totalPreco: any;
  obras: Obra[] = [];
  optionSelected = new EventEmitter<Obra>();

  obraFormControl = new FormControl();  
  filteredOptions!: Observable<Obra[]>;  

  ELEMENT_DATA: MovimentoVO[] = [];  

  displayedColumns: string[] = ['idMovimento', 'obra', 'produto', 'quantidade', 'preco', 'dataLancamento'];
  dataSource = new MatTableDataSource<MovimentoVO>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: MovimentoService,
    private obraService: ObraService,
  ) {}

  async ngOnInit() {
    await this.obraService.findAllPromise().then(data => {
      this.obras = data;
    });

    this.filteredOptions = this.obraFormControl.valueChanges.pipe(
      startWith(''),
      map((value: string|Obra) => {
        if (typeof value === 'string') {
          return filterOptionsByLabel(this.obras, value);
        }
        return this.obras;
      }));
  }

  displayLabelFn(obra: Obra|null) {
    return obra ? obra.idObra + " - " + obra.descricao : '';
  }

  trackByIdFn(obra: Obra) {
    return obra.idObra;
  }

  consultar(obra: Obra): void {
    this.service.findByIdObra(obra.idObra).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<MovimentoVO>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

      this.totalPreco = resposta.map(x => x.preco).reduce((acc, value) => acc + value, 0);
    })
  }

  validaCampos(): boolean {
    return this.obraFormControl.valid;
  }

}

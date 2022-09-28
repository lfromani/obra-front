import { Component, OnInit } from '@angular/core';
import { MovimentoService } from 'src/app/services/movimento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaMovimentos: any[] = [];

  constructor(
    private service: MovimentoService,
  ) { }

  ngOnInit(): void {
    this.service.findMovimentosHome().subscribe(data => {
      this.listaMovimentos = data;
    });

    console.log(this.listaMovimentos);

  }

}

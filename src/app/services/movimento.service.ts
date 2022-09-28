import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { MovimentoDTO } from '../dtos/movimentoDTO';
import { MovimentoVO } from '../vos/movimentoVO';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {

  constructor(private http: HttpClient) { }

  findByIdObra(idObra: any): Observable<MovimentoVO[]> {
    return this.http.get<MovimentoVO[]>(`${API_CONFIG.baseUrl}/movimentos/findByIdObra/${idObra}`);
  }

  create(movimento: MovimentoDTO): Observable<MovimentoDTO> {
    return this.http.post<MovimentoDTO>(`${API_CONFIG.baseUrl}/movimentos`, movimento);
  }

  findMovimentosHome(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/movimentos`);
  }
  
}

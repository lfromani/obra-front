import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UnidadeMedida } from '../models/unidadeMedida';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<UnidadeMedida> {
    return this.http.get<UnidadeMedida>(`${API_CONFIG.baseUrl}/unidadesmedida/${id}`);
  }

  findAll(): Observable<UnidadeMedida[]> {
    return this.http.get<UnidadeMedida[]>(`${API_CONFIG.baseUrl}/unidadesmedida`);
  }

  create(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.post<UnidadeMedida>(`${API_CONFIG.baseUrl}/unidadesmedida`, unidadeMedida);
  }

  update(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.put<UnidadeMedida>(`${API_CONFIG.baseUrl}/unidadesmedida/${unidadeMedida.idUnidadeMedida}`, unidadeMedida);
  }

  delete(id: any): Observable<UnidadeMedida> {
    return this.http.delete<UnidadeMedida>(`${API_CONFIG.baseUrl}/unidadesmedida/${id}`);
  }

}
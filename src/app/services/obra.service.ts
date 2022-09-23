import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Obra } from '../models/obra';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${API_CONFIG.baseUrl}/obras`);
  }

  findById(id: any): Observable<Obra> {
    return this.http.get<Obra>(`${API_CONFIG.baseUrl}/obras/${id}`);
  }

  create(obra: Obra): Observable<Obra> {
    return this.http.post<Obra>(`${API_CONFIG.baseUrl}/obras`, obra);
  }

  update(obra: Obra): Observable<Obra> {
    return this.http.put<Obra>(`${API_CONFIG.baseUrl}/obras/${obra.idObra}`, obra);
  }

  async findAllPromise(): Promise<Obra[]> {
    return await this.http.get<Obra[]>(`${API_CONFIG.baseUrl}/obras`).toPromise();
  }
  
}

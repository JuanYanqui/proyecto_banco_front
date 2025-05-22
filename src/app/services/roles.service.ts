import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/roles';
import { environment } from '../core/enviroments/environment';
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlEviroment = environment.baseUrl;
  private URL = this.urlEviroment + "/rol/";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Rol[]>(this.URL + 'li')
  }

  getById(idRol: number) {
    return this.http.get<Rol>(this.URL + idRol);
  }

  post(rol: Rol) {
    return this.http.post<Rol>(this.URL + '?', rol);
  }

  delete(idRol: number) {
    return this.http.delete<boolean>(this.URL + `eliminar/${idRol}`)
  }

  getByName(nombre: string) {
    return this.http.get<Rol>(this.URL + `byName/${nombre}`);
  }
}

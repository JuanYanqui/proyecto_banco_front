import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../core/enviroments/environment';
import { AuthResponse } from '../models/authResponse';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEviroment = environment.baseUrl;
  private URL = this.urlEviroment + "/usuario/";

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.URL + 'li');
  }

  getPorId(idUsuario: any) {
    return this.http.get<Usuario>(this.URL + idUsuario);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.URL + 'cre', usuario);
  }

  updateUsuario(usuario: Usuario, idUsuario: any) {
    console.log("servicio");
    console.log(usuario);
    return this.http.put<Usuario>(this.URL + `upd/${idUsuario}`, usuario);
  }

  deleteUsuario(idUsuario: number) {
    return this.http.delete<boolean>(this.URL + `eliminar/${idUsuario}`);
  }

  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post<AuthResponse>(this.URL + 'login', body);
  }

  verfUsername(username: string) {
    return this.http.get<boolean>(this.URL + `porUsername/${username}`)
  }
}

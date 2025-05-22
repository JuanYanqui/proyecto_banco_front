import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../core/enviroments/environment';
import { Observable } from 'rxjs';
import { Cuenta } from '../models/cuenta';
@Injectable({
    providedIn: 'root'
})
export class CuentaService {
    private urlEviroment = environment.baseUrl;
    private URL = this.urlEviroment + "/cuenta/";

    constructor(private http: HttpClient) { }

    getCuentas(idUsuario: number): Observable<Cuenta[]> {
        return this.http.get<Cuenta[]>(this.URL + idUsuario);
    }
}

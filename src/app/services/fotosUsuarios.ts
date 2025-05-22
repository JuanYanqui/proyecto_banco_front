import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { environment } from '../core/enviroments/environment';
import { PreguntaFilter } from '../models/preguntaFilter';
import { FotoUsuario } from '../models/fotoUsuario';
@Injectable({
    providedIn: 'root'
})
export class FotosUsuariosService {
    private urlEviroment = environment.baseUrl;
    private URL = this.urlEviroment + "/fotoUsuario/";

    constructor(private http: HttpClient) { }
    
    obtenerFotosU(idUsuario: number): Observable<FotoUsuario[]> {
        return this.http.get<FotoUsuario[]>(this.URL + idUsuario);
    }
}

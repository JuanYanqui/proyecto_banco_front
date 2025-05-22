import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { environment } from '../core/enviroments/environment';
import { PreguntaFilter } from '../models/preguntaFilter';
import { RespuestaFilter } from '../models/repuestaFilter';
@Injectable({
    providedIn: 'root'
})
export class PreguntasService {
    private urlEviroment = environment.baseUrl;
    private URL = this.urlEviroment + "/preguntaSeguridad/";

    constructor(private http: HttpClient) { }

    obtenerPreguntas(idUsuario: number): Observable<PreguntaFilter> {
        return this.http.get<PreguntaFilter>(this.URL + idUsuario);
    }

    verificarResp(idFoto: number, idPregunta: number, respuesta: string): Observable<RespuestaFilter> {
        const params = {
            idFoto: idFoto.toString(),
            idPregunta: idPregunta.toString(),
            respuesta: respuesta
        };
        return this.http.get<RespuestaFilter>(this.URL+"verificarResp", { params });
    }
}

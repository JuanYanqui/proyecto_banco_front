import { Usuario } from "./usuario";

export class FotoUsuario {
    idFoto: number=0;
    nombreFoto?: string;
    contenido: any;
    apellido?: string;
    esRespuestaCorrecta?: number=0;
    usuario!: Usuario;
    imageSrc?: string;
}

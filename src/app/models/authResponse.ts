import { Usuario } from "./usuario";

export class AuthResponse {
    token?: string;
    usuario!: Usuario;
}
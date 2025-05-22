import { Usuario } from "./usuario";

export class Cuenta {
    nroCuenta: number=0;
    tipoCliente?: string;
    tipoCuenta?: string;
    saldoContable?: number=0;
    saldoDisponible?: number=0;
    retenciones?: number=0;
    autorizacion?: number=0;
    estado: boolean = false;
    usuario!: Usuario;
}

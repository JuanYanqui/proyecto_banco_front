import { Component } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CuentaService } from '../services/cuentas';
import { Cuenta } from '../models/cuenta';

@Component({
    selector: 'app-banco-loja',
    templateUrl: './banco-inicio.component.html',
    styleUrls: ['../app.component.css'],
    imports: [CommonModule],
})
export class BancoInicioComponent {
    usuarioName: string | null = null;
    usuarioCedula: string | null = null;
    usuarioid: any | null = null;
    listCuentas: Cuenta[] = [];
    today: Date = new Date();
    constructor(private toastr: ToastrService, private router: Router, private cuentaService: CuentaService) { }
    ngOnInit(): void {
        this.obtenerUsuario();

    }

    obtenerUsuario() {
        this.usuarioName = localStorage.getItem("userName")
        this.usuarioid = localStorage.getItem("idUsuario")
         this.usuarioCedula = localStorage.getItem("cedula")
        try {
            this.cuentaService.getCuentas(this.usuarioid).subscribe(
                data => {
                    if (data != null) {
                        this.listCuentas = data;
                    } else {
                        this.toastr.error("NO SE PUDO RECUPERAR LAS CUENTAS!", "INICIO");
                    }

                }
            )
        } catch (error) {
            this.toastr.warning(error as string)
        }
    }
    exit() {
        localStorage.clear();
        this.router.navigate(['home']);
    }
}

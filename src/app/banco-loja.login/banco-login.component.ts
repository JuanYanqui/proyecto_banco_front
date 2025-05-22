import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/authResponse';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './banco-login.component.html',
  styleUrls: ['../app.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  usuario: Usuario = new Usuario;
  authUsuario: AuthResponse = new AuthResponse;
  tipoUser: any;
  user: any;
  constructor(private toastr: ToastrService, private usuarioService: UsuarioService, private router: Router) { }

  login() {
    const usernamePattern = /^[A-Za-z0-9]+$/;
    const passwordPattern = /^[A-Za-z0-9]+$/;

    if (!usernamePattern.test(this.usuario.username) || !passwordPattern.test(this.usuario.password)) {
      this.toastr.error("El nombre de usuario y la contraseña solo deben contener letras y números.", "Login");
      return;
    }
    try {
      this.usuarioService.login(this.usuario.username, this.usuario.password).pipe(
        catchError(error => {
          // Handle different status codes or errors here
          if (error.status === 401) {
            this.toastr.error("USERNAME O PASSWORD INCORRECTOS!", "Login");
          } else {
            this.toastr.error("Ha ocurrido un error al intentar iniciar sesión", "Login");
          }
          return throwError(error); // Rethrow the error to propagate it further if needed
        })
      ).subscribe(
        data => {
          console.log(data);
          if (data != null) {
            this.usuario.idUsuario = data.usuario.idUsuario;
            localStorage.setItem("localIdPersona", String(data.usuario.persona.idPersona));
            localStorage.setItem("token", String(data.token));
            localStorage.setItem("cedula", String(data.usuario.persona.cedula));
            this.user = data.usuario.persona?.foto
            this.toastr.success("BIENVENIDO " + data.usuario.username, "Login");
            localStorage.setItem('idUsuario', String(this.usuario.idUsuario));
            localStorage.setItem('nameImagen', String(this.user));
            localStorage.setItem('userName', String(data.usuario.persona?.nombre + " " + data.usuario.persona?.apellido));
            location.replace('/acceso')

          } else {
            this.toastr.error("USERNAME O PASSWORD INCORRECTOS!", "Login");
            this.usuario = new Usuario;

          }

        }
      )
    } catch (error) {
      this.toastr.warning(error as string)
    }

  }
  goHome() {
    //location.replace('/home')
  }
}

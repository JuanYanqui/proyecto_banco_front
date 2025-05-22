import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FotosUsuariosService } from '../services/fotosUsuarios';
import { Router } from '@angular/router';
import { PreguntasService } from '../services/preguntas';
import { PreguntaFilter } from '../models/preguntaFilter';
import { FotoUsuario } from '../models/fotoUsuario';
import { RespuestaFilter } from '../models/repuestaFilter';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './banco-acceso.component.html',
    styleUrls: ['../app.component.css'],
    imports: [FormsModule, CommonModule],
})
export class AccesoComponent {
    usuario: string | null = null;
    usuarioName: string | null = null;
    usuarioid: any | null = null;
    preguntas: PreguntaFilter = new PreguntaFilter();
    listFotos: FotoUsuario[] = [];
    respuesta:RespuestaFilter = new RespuestaFilter();

    constructor(private toastr: ToastrService, private fotosUsuarioService: FotosUsuariosService, private preguntaService: PreguntasService, private router: Router) { }
    ngOnInit(): void {
        this.obtenerUsuario();
    }

    obtenerUsuario() {
        this.usuarioName = localStorage.getItem("userName")
        this.usuarioid = localStorage.getItem("idUsuario")
        try {
            this.preguntaService.obtenerPreguntas(this.usuarioid).subscribe(
                data => {
                    if (data != null) {
                        this.preguntas = data;
                        this.fotosUsuarioService.obtenerFotosU(this.usuarioid).subscribe(
                            data2 => {
                                if (data != null) {
                                    this.listFotos = data2.map(foto => ({
                                        ...foto,
                                        imageSrc: 'data:image/jpeg;base64,' + foto.contenido
                                    }));
                                } else {
                                    this.toastr.error("NO SE PUDO RECUPERAR LAS IMAGENES !", "ACCESO");
                                }
                            }
                        )
                    } else {
                        this.toastr.error("NO SE PUDO RECUPERAR LAS PREGUNTAS!", "ACCESO");
                    }

                }
            )
        } catch (error) {
            this.toastr.warning(error as string)
        }

    }

    changePregunta() {
        this.obtenerUsuario()
    }

    goHome() {
        location.replace('/home')
    }
    question: string = '¿Cuáles son los últimos 4 dígitos de tu número de cédula?';
    answer: string = '';
    selectedImage: FotoUsuario | null = null;
    showError: boolean = false;

    selectImage(name: FotoUsuario) {
        this.selectedImage = name;
    }

    onSubmit() {
        if (!this.answer.trim()) {
            this.showError = true;
            return;
        }

        if (!this.selectedImage) {
            alert('Debe seleccionar una imagen.');
            return;
        }

        this.showError = false;

    try {
            this.preguntaService.verificarResp(this.selectedImage.idFoto,this.preguntas.idPregunta,this.answer).subscribe(
                data => {
                    console.log(data);
                    if (data != null) {
                        this.respuesta = data;
                         this.toastr.success("RESPUESTAS CORRECTAS ", "ACCESO");
                          location.replace('/dashboard')
                    } else {
                        this.toastr.error("LAS RESPUESTAS SON ERRONEAS!", "ACCESO");
                    }

                }
            )
        } catch (error) {
            this.toastr.warning(error as string)
        }
    }
}

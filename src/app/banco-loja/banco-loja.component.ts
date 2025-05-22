import { Component } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banco-loja',
  templateUrl: './banco-loja.component.html',
  styleUrls: ['../app.component.css'],
  imports: [CommonModule],
})
export class BancoLojaComponent {
     constructor(private toastr: ToastrService,private router: Router) {}
    ingresarLogin(){
    this.router.navigate(['login']);
  }
}

// app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { BancoLojaComponent } from './banco-loja/banco-loja.component';
import { AccesoComponent } from './banco-loja.acceso/banco-acceso.component';
import { LoginComponent } from './banco-loja.login/banco-login.component';
import { NgModule } from '@angular/core';
import { BancoInicioComponent } from './banco-loja.inico/banco-inicio.component';
import { AuthGuard } from './core/interceptors/services/authGuard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',component:BancoLojaComponent
    },
    {
        path: 'login',component:LoginComponent
    },
    {
        path: 'acceso',component:AccesoComponent,canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',component:BancoInicioComponent,canActivate: [AuthGuard]
    },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

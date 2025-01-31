import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';


export const routes: Routes = [
    {path:"", component:PaginaInicialComponent},
    {path:"inicio-sesion", component:InicioSesionComponent}
];

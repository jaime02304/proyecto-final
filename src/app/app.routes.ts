import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PerfilPaginaComponent } from './perfil-pagina/perfil-pagina.component';
import { isLoginGuard } from './guards/is-login.guard';
import { ModificarUsuarioPerfilComponent } from './modules/modificar-usuario-perfil/modificar-usuario-perfil.component';
import { CrearGruposComponent } from './modules/crear-grupos/crear-grupos.component';
import { EliminarGrupoComponent } from './modules/eliminar-grupo/eliminar-grupo.component';


export const routes: Routes = [
    {path:"", component:PaginaInicialComponent},
    {path:"inicio-sesion", component:InicioSesionComponent},
    {path:"pagina-perfil", component:PerfilPaginaComponent, canActivate:[isLoginGuard]},
    {path:"modificar-perfil", component:ModificarUsuarioPerfilComponent},
    {path:"crear-grupo", component:CrearGruposComponent},
    {path:"eliminar-grupo/:id/:nombre", component:EliminarGrupoComponent}
];

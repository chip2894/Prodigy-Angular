import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

const routes: Routes = [
  { 
    path: '',
    component: UsuariosComponent,
    children: [
      { 
        path: '',
        component: ListaUsuariosComponent
      },
    ]
  },
  { 
    path: 'Usuario/:id',
    component: FormularioUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }

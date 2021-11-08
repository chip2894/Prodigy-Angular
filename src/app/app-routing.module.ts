import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { AuthGuard } from './Prodigy/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login', 
    loadChildren: () => import('./Prodigy/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: '',
    component: CustomLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        canActivate: [AuthGuard],
        path: '', 
        loadChildren: () => import('./Prodigy/usuarios/usuarios-routing.module').then(m => m.UsuariosRoutingModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

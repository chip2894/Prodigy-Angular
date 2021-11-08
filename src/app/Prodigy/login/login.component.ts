import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateBasis } from '@angular/flex-layout';
import { UsuariosService } from '../servicios/usuarios.service';
import { RequestLoginModel } from '../models/request/request.login.model';
import { ResponseLoginModel } from '../models/response/response.login.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  inputType = 'password';
  visible = false;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  usuarioLogueado: ResponseLoginModel = null;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private _usuariosService: UsuariosService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\W]+$/), Validators.minLength(8)]]
    });
  }

  send() {

    if(this.form.invalid){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAllAsTouched();
      });
    }
    
    let request: RequestLoginModel = {
      usuario: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this._usuariosService.loginUsuario(request)
    .pipe(
      finalize( () => {
        if( this.usuarioLogueado.id > 0 )
        {
          this.snackbar.open('Inicio de Sesión Correcto', 'THANKS', {
            duration: 500
          });
          localStorage.setItem('status',this.usuarioLogueado.isEnabled);
          localStorage.setItem('userName',this.usuarioLogueado.userName);
          localStorage.setItem('fullName',this.usuarioLogueado.firstName + " " + this.usuarioLogueado.lastName);
          setTimeout(() => {
            this.router.navigate(['/']);        
          }, 600)
        }
        else{
          this.snackbar.open('Usuario o Contraseña Incorrectos, intente nuevamente', 'THANKS', {
            duration: 10000
          });
        }
      })
    )
      .subscribe( (response: ResponseLoginModel) => {
        this.usuarioLogueado = response;
      },error =>{

      });
    
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}

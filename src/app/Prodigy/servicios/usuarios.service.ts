import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestAddUsuarioModel } from '../models/request/request.addusuario.model';
import { RequestBodyModel } from '../models/request/request.body.model';
import { RquestCnslUsuarioModel } from '../models/request/request.cnslusuario.model';
import { RequestDltUsuarioModel } from '../models/request/request.dltususrio.model';
import { RequestLoginModel } from '../models/request/request.login.model';
import { RequestModUsuarioModel } from '../models/request/request.modusuario.model';
import { RequestValUsuarioModel } from '../models/request/request.valusuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private RutaApi:string = "https://localhost:44315";

    constructor(private http: HttpClient){
    }

    loginUsuario(request:RequestLoginModel ){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Login`,request);
    }

    logoutUsuario(request:RequestBodyModel ){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Logout`,request);
    }

    ListaUsuarios(request:RequestBodyModel ){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Consultar/Usuarios`,request);
    }

    addUsuarios(request:RequestAddUsuarioModel ){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Agregar`,request);
    }

    deleteUsuario(request:RequestDltUsuarioModel){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Eliminar`,request);
    }

    consultarUsuarioById(request:RquestCnslUsuarioModel){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Consultar/Usuario`,request);
    }

    alterUsuario(request:RequestModUsuarioModel){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Modificar`,request);
    }

    validarUsuario(request:RequestValUsuarioModel){
        return this.http.post(`${this.RutaApi}/api/examSkillify/Usuarios/Validar`,request);
    }

}
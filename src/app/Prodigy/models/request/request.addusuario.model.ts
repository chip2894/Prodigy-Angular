export class RequestAddUsuarioModel{

    public usuario: string;

    public userName: string;
    public email: string | null;
    public firstName: string;
    public lastName: string;
    public dateOfBirth: string | null;
    public password: string;
    public isEnabled: boolean;

    constructor(){

    }
}
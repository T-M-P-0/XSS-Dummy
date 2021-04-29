export class UserDto {
  private _fullName: string;
  private _password: string;

  public constructor (fullName : string, password : string){
      this._fullName = fullName;
      this._password = password; 
  }

  get fullName () : string {
    return this._fullName;
  }

  get password () : string {
      return this._password;
  }
}
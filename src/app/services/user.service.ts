import { Injectable } from '@angular/core';
import { Server } from '../shared/server';
import { HttpClient } from '@angular/common/http';

interface UserRegister {
  email: string;
  name: string;
  password: string;
  birthday: string;
}

interface UserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = Server.checkUrl();
  constructor(private http: HttpClient) { }

  register(userRegister: UserRegister){
    let url = this.url + '/users'

    return this.http.post(url,userRegister);
  }

  login(userLogin: UserLogin){
    let url = this.url + '/auth/login'

    return this.http.post(url,userLogin);
  }
}

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { DataService } from '../core/data.service';

//import 'rxjs/add/operator/toPromise';
import { Auth } from "../domain/entities";
@Injectable()
export class AuthService {
  constructor(private data: DataService) { }
  async Login(uid: string, upas: string, fid: string) {
    let data = await this.data.GetAuthData('login', { 'uid': uid, 'upas': upas, 'fid': fid });
    let logyn = false;
    //let data = await this.userService.GetUser(uid, upas, fid);
    let stat = data['stat'];
    //let stat = 'OKa';
    if (stat == 'OK') { //正确登录
      let userobj = data['user'];
      let userstr = JSON.stringify(userobj)
      this.SetToken(userstr);
      logyn = true;
    }
    return logyn;
  }

  checkLogin(url: string): boolean {
    let userstr = this.GetToken();
    if (userstr) {
      return true;
    }
    return false;
  }
  GetRedirectUre() {
    let url = localStorage.getItem('redirectUre');
    if (!url) { // 空或 null
      url = 'menu';
    }
    return url;
  }
  SetRedirectUre(url: string) {
    localStorage.setItem('redirectUre', url);
  }
  GetToken(): string {
    let userstr = localStorage.getItem('user');
    let token = '';
    //console.log(userstr);
    // return "";
    if (String(userstr) !== "null") {
      let userobj = JSON.parse(userstr);
      //console.log(userobj);
      token = userobj.token;
      //console.log(token);
    }
    return token;
  }
  SetToken(user: string) {
    localStorage.setItem('user', user);
  }
  DoProcessErr(data: any) {

  }
  ClearToken(data: any) {
    localStorage.removeItem("user");
  }

}

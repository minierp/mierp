import { Component, Pipe, PipeTransform, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Auth } from "../domain/entities";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class AppLogin {
  public user = { uname: 'admin', upass: '', fid: '20170201' };
  private auth: Auth;
  validateForm: FormGroup;
  constructor(@Inject('auth') private service, private router: Router, private fb: FormBuilder, private titleService: Title) {
    //this.service.ClearToken();
    this.titleService.setTitle('ＭiniERP 用户登录');
  }
  async onclick() {
    let logyn = await this.service.Login(this.user.uname, this.user.upass, this.user.fid);
    if (logyn) { //正确登录
      // let url = localStorage.getItem('redirectUre');
      let url = this.service.GetRedirectUre();
      if (url) { // 空或 null
        this.router.navigate([url]);
      }
      this.router.navigate(['menu']);
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}

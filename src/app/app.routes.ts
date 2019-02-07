import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AppLogin} from './home/login';
import {AppMenu} from './menu/app.menu';
import {MainMenu} from './menu/main.menu';
import {AuthGuardService} from './core/auth-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  //{path: 'menu', canActivate: [AuthGuardService], component: AppMenu},
  {path: 'menu',canActivate: [AuthGuardService],component:AppMenu,children:[
    {path:"",redirectTo:"main",pathMatch:"full"},
    {path:"main",component:MainMenu},
    {path: '**',redirectTo: 'main', pathMatch: 'full'} //不存在的路由
  ]},
  {path: 'jinhuo', loadChildren : "./jinhuo/index.model#IndexModule"},
  {path:"cg",component:MainMenu,children:[
    {path:"",redirectTo:"list",pathMatch:"full"},
    {path:"list",component:MainMenu},
    {path:"edit",component:MainMenu},
    {path:"view",component:MainMenu},
    {path:"print",component:MainMenu},
    {path: '**',redirectTo: 'list', pathMatch: 'full'} //不存在的路由
  ]},
  {path: 'login', component: AppLogin},
  {path: '**',redirectTo: 'menu', pathMatch: 'full'} //不存在的路由
  //{path: 'test', component: MynavComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{useHash:true});  //不加 {useHash:true} 在 dist 会出现404

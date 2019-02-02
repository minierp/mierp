import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AppLogin} from './home/login';
import {AppMenu} from './menu/app.menu';
import {JinghuoComponent} from './jinghuo/jinghuo.component';
import {MainMenu} from './menu/main.menu';
import {AuthGuardService} from './core/auth-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  //{path: 'menu', canActivate: [AuthGuardService], component: AppMenu},
  {path: 'menu',canActivate: [AuthGuardService],component:AppMenu,children:[
    {path:"",redirectTo:"main",pathMatch:"full"},
    {path:"main",component:MainMenu},
    {path:"cg",component:JinghuoComponent},
    {path:"xs",component:JinghuoComponent},
    {path: '**',redirectTo: 'main', pathMatch: 'full'} //不存在的路由
  ]},
  {path:"cg",component:JinghuoComponent,children:[
    {path:"",redirectTo:"list",pathMatch:"full"},
    {path:"list",component:JinghuoComponent},
    {path:"edit",component:JinghuoComponent},
    {path:"view",component:JinghuoComponent},
    {path:"print",component:JinghuoComponent},
    {path: '**',redirectTo: 'list', pathMatch: 'full'} //不存在的路由
  ]},
  {path: 'login', component: AppLogin},
  {path: '**',redirectTo: 'menu', pathMatch: 'full'} //不存在的路由
  //{path: 'test', component: MynavComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{useHash:true});  //不加 {useHash:true} 在 dist 会出现404

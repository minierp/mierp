import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexRoot } from './index.root';
import { ListComponent } from './list.component';
import { EditComponent } from './edit.component';

import { AuthGuardService } from '../core/auth-guard.service';

const IndexRoutes: Routes = [
  {
    path: '',
    component: IndexRoot,
    canActivate: [AuthGuardService],
    children: [
      { path: 'list', component: ListComponent },
      {
        path: 'edit/:id', component: EditComponent
      /*  children: [
          {
            path: ':id',
            component: EditComponent
          }
          /*,
          {
            path: '',
            component: EditComponent
          }
        ] */
      },
      {
        path: 'view', component: EditComponent,
        children: [
          {
            path: ':id',
            component: EditComponent
          },
          {
            path: '',
            component: EditComponent
          }
        ]
      },
      {
        path: 'print', component: EditComponent,
        children: [
          {
            path: ':id',
            component: EditComponent
          },
          {
            path: '',
            component: EditComponent
          }
        ]
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' } //不存在的路由
    ]
  }
  /*,
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'edit', component: EditComponent },
  { path: 'view', component: ListComponent },
  { path: 'print', component: ListComponent }*/
];

@NgModule({
  imports: [
    RouterModule.forChild(IndexRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IndexRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list.component';

import { AuthGuardService } from '../core/auth-guard.service';

const IndexRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'list', component: ListComponent },
      { path: 'edit', component: ListComponent },
      { path: '', component: ListComponent }
    ]
  }
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
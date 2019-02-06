import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IndexRoot } from './index.root';
import { ListComponent } from './list.component';
import { EditComponent } from './edit.component';

import { IndexRoutingModule } from './index.routing';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    IndexRoutingModule
  ],
  declarations: [
    IndexRoot, ListComponent, EditComponent
  ]
})
export class IndexModule { }

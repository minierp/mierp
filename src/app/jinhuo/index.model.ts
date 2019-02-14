import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IndexRoot } from './index.root';
import { PathService } from './path.service';
import { ListComponent } from './list.component';
import { EditComponent } from './edit.component';
import { PrintComponent } from './print.component'
import { ChkynComponent } from '../public/chkyn.component'
import { PrintPubComponent } from '../public/print.pub.component'
import { HtmlPipe } from '../public/htmlpipe.pipe'
import { TablekeyDirective } from '../public/directive/tablekey.directive';
import { DoCalcDirective } from '../public/directive/doCalc.directive';
//import { MessagesModule } from '../public/lib/messages';

import { IndexRoutingModule } from './index.routing';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    IndexRoutingModule
    //,MessagesModule
  ],
  providers: [PathService],//注册服务
  declarations: [
    IndexRoot, ListComponent, EditComponent, ChkynComponent, PrintComponent, HtmlPipe,PrintPubComponent,
    TablekeyDirective,DoCalcDirective
  ]
})
export class IndexModule {
}

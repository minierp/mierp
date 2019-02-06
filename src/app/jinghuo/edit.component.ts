import { Component, Pipe, PipeTransform } from '@angular/core';
//import {AuthGuardService} from '../core/auth-guard.service';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

export class EditComponent {
  loaded: boolean = true;
  opt: any = { CHK: 99, QIAN: 0, STA: 0 };
  par: any;// { clactp: D03 };
  orders: any={}; // {'mast':{'SHMID':'001'},delts:[{'SHDID':'001'}]};
  mast: any = {}; // {'mast':{'SHMID':'001'};
  delts: any = []; // delts:[{'SHDID':'001'}];
  edited:boolean=true;
  id: string = '';  //SHMID

  constructor(private data: DataService, private routeInfo: ActivatedRoute) {
  }
  ngOnInit() {
    /* this.routeInfo.url.subscribe(params => { //如采用子路由   path: ':id'  path 取不到
       console.log(params);
     })*/
    //console.log(url);　params　paramMap
    this.routeInfo.paramMap.subscribe(params => {
      let id = params.get('id');  //路由要采用  edit/:id  如采用子路由   path: ':id',component 取id的值为空 2019-02-06
      //console.log(params);
      if (typeof (id) != "undefined") {
        this.id = id;
      }
      this.LoadData(this.id);
    })
  }
  setQIAN() {
    if (this.opt.QIAN === 0) {
      this.opt.QIAN = 1;
    } else {
      this.opt.QIAN = 0;
    }
    this.LoadData(this.id); this.LoadData(this.id);
  }
  setCHKYN() {
    if (this.opt.CHK === 0) {
      this.opt.CHK = 1;
    } else {
      this.opt.CHK = 0;
    }
    this.LoadData(this.id);
  }
  loadmast(orders: any) {
    this.mast = orders['mast'];
  }
  loaddelts(orders: any) {
    this.delts = orders['delt'];
  }
  async LoadData(id: string) {
    let data = await this.data.GetData('jinhuo/data/' + id, {});
    this.orders = data['data'];
    this.loadmast(this.orders);
    this.loaddelts(this.orders);
    this.loaded = false;
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}

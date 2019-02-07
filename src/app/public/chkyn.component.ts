import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../core/data.service';
import { stringify } from 'querystring';

@Component({  //审核结案组件
  selector: 'mi-chkyn',
  templateUrl: './chkyn.component.html',
  styleUrls: ['./chkyn.component.scss']
})
export class ChkynComponent implements OnInit {
  @Input() ckyn: string = ''; //审核状态 1 己审  0 未审
  @Input() qiyn: string = ''; //签收状态　1 己结　0 未结
  @Input() mid: string = '';
  @Input() path: string = 'def'; //单据路径
  public shck: boolean;  //审核状态 true 己审  false 未审
  public shqi: boolean;　//签收状态　true 己结　false 未结
  constructor(private data: DataService) { }

  ngOnInit() {
    this.shck = (this.ckyn == '1') ? true : false;
    this.shqi = (this.qiyn == '1') ? true : false;
    //console.log('shqi=' + this.shqi + ' qiyn=' + this.qiyn + ' ckyn=' + this.ckyn + ' shck=' + this.shck);
  }
  async DoQiyn() { //结案
    let mid = this.mid;
    let curl = this.path + '/qian/' + mid;
    let ckyn = (this.shqi) ? '1' : '0';
    let yn = await this.DoQiCkYN(curl, { "qian": ckyn })
    this.shqi = (yn == '1') ? true : false;
    //console.log(yn);
  }
  async DoCkyn() {　//签收
    let mid = this.mid;
    let curl = this.path + '/CHKYN/' + mid;
    let ckyn = (this.shck) ? '1' : '0';
    let yn = await this.DoQiCkYN(curl, { "YN": ckyn })
    //console.log(yn);
    this.shck = (yn == '1') ? true : false;
  }

  async DoQiCkYN(curl: string, par: any) {
    let data = await this.data.GetData(curl, par);
    let stat: string = data['stat'];
    let YN: string = data['YN'];  //审核后的状态 YN = 1  0;
    //console.log(data);
    if (stat == 'OK') {
      return YN;
    } else {
      return YN;
    }
  }

}

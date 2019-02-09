import { Component, Pipe, PipeTransform } from '@angular/core';
//import {AuthGuardService} from '../core/auth-guard.service';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { PathService } from './path.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

export class EditComponent {
  opt: any = { CHK: 99, QIAN: 0, STA: 0 };
  par: any = { calcdz: '', calctp: 'D03', kgdigits: 2, nmdigits: 2 };
  // calcdz: string = ''; //空'' 根据 calctp 来算   A 数量*单重  B 重量/单重  C 重量/数量 D 不计算
  // calctp: string = 'D03';// 金额计算方式 D03 数量*单价   D16 重量*单价 
  // kgdigits: number = 2;// 计算金额 按数量小数点长度 
  // nmdigits: number = 2;// 计算金额 按数量小数点长度
  orders: any = {}; // {'mast':{'SHMID':'001'},delts:[{'SHDID':'001'}]};
  mast: any = {}; // {'mast':{'SHMID':'001'};
  delts: any = []; // delts:[{'SHDID':'001'}];
  CanEdit: boolean = true;  // true 可以编辑，　false 不能编辑
  Saved: boolean = true; //true 己保存　 false 未保存
  Loaded: boolean = true; //true 己加载完成　 false 加载中
  id: string = '';  //SHMID
  private path: string = '';

  constructor(private data: DataService, private routeInfo: ActivatedRoute, private pathService: PathService) {
    this.path = pathService.path;
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
    this.LoadData(this.id);
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
    //console.log(this.mast.QIAN,this.mast.CHKYN);
    this.CanEdit=(this.mast.CHKYN==0 && this.mast.QIAN==0);
  }
  loaddelts(orders: any) {
    this.delts = orders['delt'];
  }
  async LoadData(id: string) {
    let data = await this.data.GetData(this.path + '/data/' + id, {});
    this.orders = data['data'];
    this.loadmast(this.orders);
    this.loaddelts(this.orders);
    this.Loaded = true;
  }
  doSaveOrder(){
    this.Saved=true;
  }
  DoCalcTotal(val: string) {
    this.Saved=false;//需要保存
    //console.log(val);
    //计算总计
    //console.log('doCalcTotal');
    let T03 = 0;
    let T03A = 0;
    let T05 = 0;
    let T16A = 0;
    let T15 = 0;
    let T30 = 0;
    let T31 = 0;
    let T32 = 0;
    let T33 = 0;
    let delts = this.delts;
    let zk = this.mast.ACC16 || 0; //折扣
    for (let key in delts) {
      let delt = delts[key];
      if (!delt.SHD01) {
        continue;
      }
      delt.zk = zk;
      //this.doCalcRow(delt); //计算明细项
      //console.log(delt.SHD01+ delt.Calc);
      if (!delt.CalcRow) {  // Calc 汇总是否计算当前 true 不计算，false 或 undefined 设定计算, 对帐没有选中用,默认为 false 计算
        T03 = Number(T03) + (delt.SHD03 - 0); //数量
        T05 = Number(T05) + (delt.SHD05 - 0); //金额
        T15 = Number(T15) + (delt.SHD16 - 0); //重量
      }
      T03A = Number(T03A) + (delt.SHD03A - 0); //帐面数
      T16A = Number(T16A) + (delt.SHD16A - 0); //实际数

      T30 = Number(T30) + (delt.SHD30 - 0);
      T31 = Number(T31) + (delt.SHD31 - 0);
      T32 = Number(T32) + (delt.SHD32 - 0);
      T33 = Number(T33) + (delt.SHD33 - 0);
    }
    this.mast.SHM16 = T03;  //数量合计
    this.mast.SHM16A = T15;  //重量合计
    this.mast.SHT03A = T03A;//帐面数
    this.mast.SHT16A = T16A;//实际数
    this.mast.SHM06B = T05;
    if (this.mast.TOTRATE == 1) {  //是否汇总计算税率
      this.mast.SHM06C = T05 * ((this.mast.SHM15 - 0) / 100); //明细合计 × 税率
    }
    let m06A = parseFloat(this.mast.SHM06A); //整单折扣
    let m06D = parseFloat(this.mast.SHM06D); //应扣项目  手续费
    let m06B = parseFloat(this.mast.SHM06B); //应收
    let m06C = parseFloat(this.mast.SHM06C); //税额
    let M19 = parseFloat(this.mast.SHM19);   //运费
    if (isNaN(m06A)) {
      m06A = 0;
    }
    if (isNaN(m06B)) {
      m06B = 0;
    }
    if (isNaN(m06C)) {
      m06C = 0;
    }
    if (isNaN(m06D)) {
      m06D = 0;
    }
    if (isNaN(M19)) {
      M19 = 0;
    }
    this.mast.SHM06C = Number(this.mast.SHM06C).toFixed(2);  //税额
    this.mast.SHM06 = Number(m06B + M19 - m06A - m06D + m06C).toFixed(2);  //含税总金额
    //this.mast.SHM07 = convertBB(this.mast.SHM06, this.mast.SHM18TP); //实收 数字加币别
    this.mast.SHM30 = T30.toFixed(2);
    this.mast.SHM31 = T31.toFixed(2);
    this.mast.SHM32 = T32.toFixed(2);
    this.mast.SHM33 = T33.toFixed(2);
    let dtot = this.delts.length; //在后面加多一行
    (this.delts[dtot - 1].SHD01) && this.delts.push({});
  }
  SetPDJTP(DJTP: string) {
    this.opt.calctp = DJTP;
    this.mast.MDJTP = this.opt.calctp;
    let delts = this.delts;
    for (var key in delts) {
      let delt = delts[key];
      if (!delt.SHD01) {
        continue
      } else {
        delt.DDJTP = this.opt.calctp;
      }
    }
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}

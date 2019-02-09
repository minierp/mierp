import { Directive, EventEmitter, HostListener, Input ,Output} from '@angular/core';

@Directive({
  selector: '[miOrdDeltCalc]'  // table　上下左右按键移动焦点
})

export class DoCalcDirective {

  constructor() {
  }
  @Input() delt: any = {};
  @Input() optpar: any = {calcdz:'',calctp:'D03',kgdigits:2,nmdigits:2}; //计算选项
  @Output() changeTotal: EventEmitter<string> = new EventEmitter();
  //@Output() 
  // calcdz: string = ''; //空'' 根据 calctp 来算   A 数量*单重  B 重量/单重  C 重量/数量 D 不计算
  // calctp: string = 'D03';// 金额计算方式 D03 数量*单价   D16 重量*单价 
  // kgdigits: number = 2;// 计算金额 按数量小数点长度 
  // nmdigits: number = 2;// 计算金额 按数量小数点长度

  @HostListener('blur', ['$event']) onKeyDown(event: any) {
    //let e = <KeyboardEvent>event;
    this.doCalcRow(this.delt);
  }
  doCalcRow(delt: any) {
    //delt.SHD05 = delt.SHD03 * delt.SHD04;
    //console.log(delt);
    let opt=this.optpar;
    //console.log(this.optpar);return;

    if (!delt.SHD01) {
      return;
    }

    if (isNaN(parseFloat(delt.SHD03))) {  //数量
      return;
    }
    if (!delt.DDJTP) {
      delt.DDJTP = opt.calctp;
    }
    if (!delt.SHD05) {
      delt.SHD05 = 0;
    }
    if (!delt.SHD05A) {
      delt.SHD05A = 0;
    }
    if (!delt.SHD05B) {
      delt.SHD05B = 0;
    }
    if (!delt.SHD06) {
      delt.SHD06 = '';
    }
    if (!delt.SHD15) {
      delt.SHD15 = 0;
    }
    if (!delt.SHD16) {
      delt.SHD16 = 0;
    }

    if (String(delt.PROD05) === "null" || delt.PROD05 === undefined) {
      delt.PROD05 = '';
    }
    if (String(delt.PROD06) === "null" || delt.PROD06 === undefined) {
      delt.SHD06 = '';
    }

    if (delt.PROD05.toUpperCase() === delt.PROD06.toUpperCase()) { //单位一样不计算单重
      delt.SHD16 = delt.SHD03;   //单位相等数量重量一样
    } else {   //考虑到有时没有单重要自定义输入重量
      if (!delt.SHD15) {
        delt.SHD15 = 0;
      }
      let djtp = delt.DDJTP;
      //console.log('calcdz='+$scope.calcdz);
      switch (opt.calcdz)  // 单重计算方式   空'' 根据 calctp 来算   A 数量*单重  B 重量/单重  C 重量/数量 D 不计算
      {
        case 'A':   // A 数量*单重
          if (delt.SHD15 !== 0) {  //重量计算
            delt.SHD16 = delt.SHD03 * delt.SHD15; //数量×单重=重量
            delt.SHD16 = Number(delt.SHD16).toFixed(opt.kgdigits);
          }
          break;
        case 'B': //B 重量/单重
          if (delt.SHD15 !== 0) {  //重量计算
            delt.SHD03 = delt.SHD16 / delt.SHD15;  //重量/单重=数量
            delt.SHD03 = Number(delt.SHD03).toFixed(opt.nmdigits);
          }
          break;
        case 'C':
          if (delt.SHD03 !== 0) {  //重量计算
            delt.SHD15 = delt.SHD16 / delt.SHD03;  //重量/数量=单重
          }
          break;
        case 'D': // D 不计算
          break;
        default:
          if (delt.SHD15 !== 0) {  //重量计算
            delt.SHD15 = parseFloat(delt.SHD15);
            if (djtp === 'D16') {  //直接按 数量计算 DDJTP  注意有两个地方在计算!
              delt.SHD03 = delt.SHD16 / delt.SHD15;  //重量/单重=数量
              delt.SHD03 = Number(delt.SHD03).toFixed(opt.nmdigits);
            } else {
              delt.SHD16 = delt.SHD03 * delt.SHD15; //数量×单重=重量
              delt.SHD16 = Number(delt.SHD16).toFixed(opt.kgdigits);
            }
          }
      }
    }
    if (!parseFloat(delt.SHD04) && delt.SHD04 != '' && delt.SHD04 != 0) {  //单价
      console.log(delt.SHD04);
      return;
    }
    // console.log($scope.calctp);
    let je = 0; //两位小数 四舍五入 0.235 不能入 0.24 加上 0.000001 解决
    if (delt.DDJTP === 'D16') {  //直接按 数量计算 DDJTP 
      je = delt.SHD16 * delt.SHD04;
      delt.DJDW = delt.PROD06;
    } else {
      je = delt.SHD03 * delt.SHD04;
      delt.DJDW = delt.PROD05;
    }
    //console.log(delt.DDJTP);
    if (je > 0) {  // je =0 会出现科学计数法 1e+10 
      je = je + 0.00000001; // 精度问题 比如  15* 18.473=277.09499999999997  <> 277.095
    }
    if (je < 0) {
      je = je - 0.00000001; // 精度问题 比如  15* 18.473=277.09499999999997  <> 277.095
    }
    if (delt.zk > 0) {  //折扣
      delt.SHD05A = je * (100 - delt.zk) / 100; //折扣计算
      delt.SHD05A = Number(delt.SHD05A).toFixed(2);
    } else {
      delt.SHD05A = 0;
    }

    delt.SHD05 = Number(je - delt.SHD05A - delt.SHD05B).toFixed(2); // - delt.SHD05A - delt.SHD05B; //两位小数 四舍五入 0.235 不能入 0.24 加上 0.000001 解决
    //console.log(delt.SHD05);
    //delt.SHD04 = Number(delt.SHD04).toFixed(4);  //加了不能输单价
    delt.SHD05 = Number(delt.SHD05).toFixed(2);

    if (parseInt(delt.PROD28) === 1) {  //自定义物料 不自动计算
      delt.SHD30 = delt.SHD30 || 0; //没有默认值会出现计算错误
      delt.SHD31 = delt.SHD31 || 0;
      delt.SHD32 = delt.SHD32 || 0;
      delt.SHD33 = delt.SHD33 || 0;
    } else {
      delt.SHD30 = parseFloat(Number(delt.SHD03 / delt.PROD33 - 0).toFixed(1)); //CTN  //箱数
      // isNaN(delt.SHD30); delt.SHD30=0;
      //delt.SHD31 = parseFloat(Number(delt.SHD03 * delt.PROD34).toFixed(2)); //N.W.  //单个净重
      //delt.SHD31 = delt.SHD16; //CBM  //单个净重
      delt.SHD31 = parseFloat(Number(delt.SHD30 * delt.PROD34 - 0).toFixed(2)); //N.W.  // 箱数 * 净重
      delt.SHD32 = parseFloat(Number(delt.SHD30 * delt.PROD35 - 0).toFixed(2)); //G.W.  // 箱数 * 毛重
      delt.SHD33 = parseFloat(Number(delt.SHD30 * delt.PROD36 - 0).toFixed(2)); //CUFT  // 箱数 * CUFT 
    }
    //this.saved = true; //保存提示
    //console.log(delt);
    this.changeTotal.emit('OK');
  }
}
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[miTablekey]'  // table　上下左右按键移动焦点
})

export class TablekeyDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    let e = <KeyboardEvent>event;
    //console.log(e.keyCode);    console.log(event.target);
    let Ktar = event.target;
    let x = Ktar.parentNode.parentNode.rowIndex; //行
    let y = Ktar.parentNode.cellIndex; //列
    let tli = Ktar.parentNode.childNodes;

    let i = this.mIndex(Ktar, tli); // iv

    let akey = e.keyCode
    let ktab = this.el.nativeElement;
    switch (akey) {
      case 37:
        this.mLeft(ktab, x, y);
        break
      case 38:
        this.mUp(ktab, x, y, i);
        break
      case 39:
        this.mRight(ktab, x, y);
        break
      case 40:
        this.mDown(ktab, x, y, i);
        break
      case 13:
        //e.keyCode = 9;
        break
    }
  }
  mLeft(ktab:any, x:number, y:number) {
    //console.log(ktab, x, y);    console.log('mLeft');
  }
  mUp(ktab:any, x:number, y:number, i:number) {
    x = x - 1;
    if (x < 1)
      return;
    let cu = ktab.rows[x].cells[y].childNodes[i];
    if (cu.nodeName == 'INPUT') {
      cu.select();
    }
    ktab.rows[x].cells[y].childNodes[i].focus();
  }
  mRight(ktab:any, x:number, y:number) {
    //console.log(ktab, x, y);    console.log('mRight');
  }
  mDown(ktab:any, x:number, y:number, i:number) {
    x = x + 1;
    if ((x + 1) > ktab.rows.length)
      return;
    let cu = ktab.rows[x].cells[y].childNodes[i];
    if (cu.nodeName == 'INPUT') {
      cu.select();
    }
    ktab.rows[x].cells[y].childNodes[i].focus();
  }
  mIndex(cur:any, obj:any):number {
    //console.log(cur);
    //for (let i in obj) {
      for (let i = 0, length = obj.length; i < length; i++) {
      //console.log(obj[i]);
      if (obj[i] == cur) {
        return i;
      }
    }
    return -1;
  }
}
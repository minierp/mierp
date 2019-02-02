import { Component, Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../core/data.service';
import { fromEvent } from 'rxjs';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.html',
  styleUrls: ['./app.menu.scss']
})

export class AppMenu {
  public FactName = '东莞市明志电脑服务有限公司';
  public UserName = '管理员';
  public DptName = '办公室';
  public isCollapsed = false;
  menuleft: any = [];
  ngOnInit() {
    fromEvent(window, 'resize').subscribe((event) => {
      //console.log("innerWidth:" + window.innerWidth);
      //console.log('innerHeight:' + window.innerHeight);
      let wei=window.innerWidth;
      if(wei<376){
        this.isCollapsed=true;
      }else{
        this.isCollapsed=false;
      }
    });
    this.LoadLeftMenu();//左侧菜单
  }
  constructor(private data: DataService) {
  }
  async LoadLeftMenu() {
    let data = await this.data.GetData('menu/left', {});
    this.menuleft = data['items'];
  }
}

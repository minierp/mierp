import { Component, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.menu.html',
  styleUrls: ['./main.menu.scss']
})

export class MainMenu {
  public FactName = '东莞市明志电脑服务有限公司';
  public Username = '管理员';
  public menuId: string = 'main';
  public menutop = []; //上部菜单
  public menumain = []; //主要菜单
  public menufoot = [];　//底部菜单
  public report = [];　//报表列表
  ngOnInit() {
    //另一种方式参数订阅  queryParams  　// 旧的参数
    this.routeInfo.queryParamMap.subscribe(params => {
      let menuid = params.get('id');
      if (typeof (menuid) != "undefined") {
        this.menuId = menuid;
      }else{
        this.menuId='main';
      }
      //console.log(this.menuId);
      this.LoadMenu();//左侧菜单
    })
  }
  constructor(private data: DataService, private routeInfo: ActivatedRoute) {

  }
  async LoadMenu() {
    let data = await this.data.GetData('menu/' + this.menuId, {});
    let menuitem = data['items'];
    this.menutop=menuitem['top'];
    this.menumain=menuitem['main'];
    this.menufoot=menuitem['foot'];
    this.report=menuitem['report'];
    
  }
}

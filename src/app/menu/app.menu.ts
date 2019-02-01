import { Component, Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  menuleft:any=[];

  constructor(private data: DataService) {
    this.LoadMenu();
   }
  async LoadMenu() {
    let data = await this.data.GetData('menu/left',{});
    this.menuleft=data['items'];
    let stat = data['stat'];

  }
}

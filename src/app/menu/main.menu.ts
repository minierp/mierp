import { Component, Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.menu.html',
  styleUrls: ['./main.menu.scss']
})

export class MainMenu {
  FactName = '东莞市明志电脑服务有限公司';
  Username = '管理员';
  menuleft:any=[];

  constructor(private data: DataService) {
    
   }

}

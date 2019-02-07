import { Component, Pipe, PipeTransform } from '@angular/core';
//import {AuthGuardService} from '../core/auth-guard.service';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { PathService } from './path.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})

export class PrintComponent {
  public printstr: string = 'printtest';
  private opt: any = { CHK: 99, QIAN: 0, STA: 0 };
  private id: string = '';  //SHMID
  private path: string = '';

  constructor(private data: DataService, private routeInfo: ActivatedRoute, private pathService: PathService) {
    this.path = pathService.path;
  }
  ngOnInit() {
    this.routeInfo.paramMap.subscribe(params => {
      let id = params.get('id');  //路由要采用  edit/:id  如采用子路由   path: ':id',component 取id的值为空 2019-02-06
      if (typeof (id) != "undefined") {
        this.id = id;
      }
      this.LoadData(this.id);
    })
  }
  async LoadData(id: string) {
    let data = await this.data.GetData(this.path + '/doprint/' + id, {});
    this.printstr = data['data'];

  }
}

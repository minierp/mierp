import { Component, Pipe, PipeTransform } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './index.root.html',
  styleUrls: ['./index.root.scss']
  //styleUrls: []
})

export class IndexRoot {
  menuleft: any = [];
  constructor(private titleService: Title) {
    this.titleService.setTitle('采购收货');
  }
}

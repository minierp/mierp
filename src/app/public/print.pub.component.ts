import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pub-print',
  templateUrl: './print.pub.component.html',
  styleUrls: ['./print.pub.component.scss']
})
export class PrintPubComponent implements OnInit {
  @Input() printhtml: string = 'pub.print';

  constructor() {

  }
  ngOnInit() {
  }

}

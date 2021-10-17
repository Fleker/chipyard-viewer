import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogLoadFileComponent } from '../dialog-load-file/dialog-load-file.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {
  @ViewChild('btnFile') btnFile?: DialogLoadFileComponent;

  constructor() { }
}

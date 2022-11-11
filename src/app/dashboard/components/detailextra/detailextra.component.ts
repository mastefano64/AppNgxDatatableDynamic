import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-detailextra',
  templateUrl: './detailextra.component.html',
  styleUrls: ['./detailextra.component.css']
})
export class DetailExtraComponent implements OnInit, OnDestroy{
  data: any;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }
}

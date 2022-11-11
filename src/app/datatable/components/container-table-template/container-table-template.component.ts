import { Component, ViewChild, ViewContainerRef, ChangeDetectorRef, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-container-table-template',
  templateUrl: './container-table-template.component.html',
  styleUrls: ['./container-table-template.component.css']
})
export class ContainerTableTemplateComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('container1', { read: ViewContainerRef }) vcr1: ViewContainerRef;
  @Input() componentdetail: any;
  @Input() row: any;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // component factory resolver not needed
    const compref = this.vcr1.createComponent(this.componentdetail);
    const comp = compref.instance as any;
    comp.data = this.row;
    this.cdr.detectChanges();
  }


  ngOnDestroy(): void {
    this.vcr1.detach();
  }
}

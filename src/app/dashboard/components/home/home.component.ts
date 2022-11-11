import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../../service/dashboard.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'HomeDashboard';
    data;

    constructor(private router: Router, private service: DashboardService) { }

    ngOnInit() {
      this.service.getData().subscribe(response => {
        this.data = response;
      });
    }
}

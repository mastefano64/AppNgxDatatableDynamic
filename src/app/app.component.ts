import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppNgxDatatableDynamic';

  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe(response => {
      const a = response;
    });
  }

}

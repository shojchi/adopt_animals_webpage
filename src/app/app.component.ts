import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { DetailedPageComponent } from './components/detailed-page/detailed-page.component';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CardComponent, DetailedPageComponent, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  ngOnInit() {
    this.http.get('http://localhost:3000/posts').subscribe(res => console.log(res, 'response'))
  }
}

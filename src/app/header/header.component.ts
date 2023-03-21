import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // Perform logout actions here, such as removing the user data from local storage
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

}

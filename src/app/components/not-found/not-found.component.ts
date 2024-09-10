import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthNavbarComponent } from "../auth-navbar/auth-navbar.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FooterComponent, AuthNavbarComponent, NavbarComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  token:string | null = localStorage.getItem('userToken');

}

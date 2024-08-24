import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../components/auth-navbar/auth-navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [AuthNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}

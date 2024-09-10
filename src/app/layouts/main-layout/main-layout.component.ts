import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  scrollToTop = ( ) => {
    window.scrollTo(0, 0);
  }

  showBtn:boolean = false;

  @HostListener('window:scroll')
  scrollTo() {
    let scrollTop = document.documentElement.scrollTop;
    if(scrollTop > 400) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  }

}

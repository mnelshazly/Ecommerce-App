import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)

  countNumber:number = 0;

  ngOnInit(): void {

    this._CartService.getCartDetails().subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
      }
    })

   this._CartService.cartNumber.subscribe({
    next: (data) => {
      this.countNumber = data;
    }
   })
  }

}

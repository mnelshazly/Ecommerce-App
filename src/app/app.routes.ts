import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductsByCatComponent } from './components/products-by-cat/products-by-cat.component';
import { ProductsByBrandComponent } from './components/products-by-brand/products-by-brand.component';
import { AllordersComponent } from './allorders/allorders.component';


export const routes: Routes = [
    {path: "", component: AuthLayoutComponent, canActivate:[isLoggedInGuard],children: [
        {path: "", redirectTo: "signin", pathMatch: "full"},
        {path: "signup", component: SignupComponent, title: "Sign Up"},
        {path: "signin", component: SigninComponent, title: "Sign In"},
        {path: "forgot-password", component: ForgotPasswordComponent, title: "Forgot Password"},
    ]},

    {path: "", component: MainLayoutComponent, canActivate:[authGuard], children: [
        {path: "", redirectTo: "home", pathMatch: "full"},
        {path: "home", component: HomeComponent, title: "Home"},
        {path: "categories", component: CategoriesComponent, title: "Categories"},
        {path: "brands", component: BrandsComponent, title: "Brands"},
        {path: "products", component: ProductsComponent, title: "Products"},
        {path: "cart", component: CartComponent, title: "Cart"},
        {path: "orders/:id", component: OrdersComponent, title: "Orders"},
        {path: "details/:id", component: ProductDetailsComponent, title: "Product Details"},
        {path: "wishlist", component: WishlistComponent, title: "Wishlist"},
        {path: "products-by-cat/:id", component: ProductsByCatComponent, title: "Products"},
        {path: "products-by-brand/:id", component: ProductsByBrandComponent, title: "Products"},
        {path: "allorders", component: AllordersComponent, title: "My Orders"},
    ]},

    {path: "**", component: NotFoundComponent, title: "Not Found"}
];

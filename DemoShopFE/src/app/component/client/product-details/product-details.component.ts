import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  listProduct : any;
  listItemInCart : any;
 AuthServiceService: any;

  constructor(private productService: ProductService,public cartService:CartService,private authService:AuthServiceService,private router: Router){}

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct(){
    this.productService.getListProduct().subscribe(data =>{
      this.listProduct = data;
      this.cartService.loadCart();
    })
  }


  addToCart(item: any){
    if (this.authService.isLoggedIn()){
    this.cartService.getItems();
    this.cartService.addToCart(item,1);
    }else{
      this.router.navigate(['/login']);


    }
    
  }

  removeFromCart(item:any){
    this.cartService.remove(item);
  }

  updateQuantity(item: any,event: any){
    let quantity : number = event.target.value;
    this.cartService.updateCart(item,quantity);
  }
  logout() {
    sessionStorage.removeItem('token');
    this.authService.setLoggedIn(false);
    // Chuyển hướng đến trang đăng nhập
  }
  p: number = 1;
  items: any[] = Array.from({length: 100}).map((_, i) => `Item ${i + 1}`);


}


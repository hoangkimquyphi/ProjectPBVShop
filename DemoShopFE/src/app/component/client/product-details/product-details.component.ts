import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { ReviewService } from 'src/app/_service/review.service';
import { Product } from 'src/app/class/product';
import { IReview } from 'src/app/class/IReview';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent  implements OnInit {
  reviews: IReview = { reviews: [] };
  productData: undefined | Product;
  productMessage: undefined | string;
  quantity:number=1;

  // reviewList: IReview | any;
  constructor(private route: ActivatedRoute,private product: ProductService,public cartService:CartService,private authService:AuthServiceService,private router: Router, private review: ReviewService) {}

  ngOnInit(): void {





    let productId = this.route.snapshot.params['id'];
    this.review.getReviewsByProductId(productId)
      .subscribe(reviews => {
        console.log("review", reviews);

        this.reviews = reviews

      });
    productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;

      });

  }

  calculateAverageRating(): number {
    const totalRating = this.reviews.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / this.reviews.reviews.length;
  }
  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
        alert('Edit Product successfully')
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.warn(data);
  }
  addToCart(item: any){
    if (this.authService.isLoggedIn()){
    this.cartService.getItems();
    this.cartService.addToCart(item,1);
    alert('Add card successfully')
    }else{
      this.router.navigate(['/login']);



    }

  }
  handleQuantity(val:string){
    if(this.quantity<20 && val==='plus'){
      this.quantity+=1;
    }else if(this.quantity>1 && val==='min'){
      this.quantity-=1;
    }
  }

  removeFromCart(item:any){
    this.cartService.remove(item);
  }


  updateQuantity(item: any,event: any){
    let quantity : number = event.target.value;
    this.cartService.updateCart(item,quantity);
  }
  onLogout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/login'])
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/login']);
    }
  }

  p: number = 1;
  items: any[] = Array.from({length: 100}).map((_, i) => `Item ${i + 1}`);

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

}



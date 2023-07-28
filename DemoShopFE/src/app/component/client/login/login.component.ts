import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements   OnInit {
  loginForm: FormGroup;
  showLogin:boolean=true
  authError:string="";
  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService,private router: Router,private user: AuthServiceService, private product:ProductService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user.userAuthReload();

  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        console.log('Login successful:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Login failed:', error.error.message);
      }
    );


    
  }
}
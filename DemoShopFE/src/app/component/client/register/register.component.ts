import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string |any
  email: string |any;
  full_name: string |any;
  phone:  string |any;
  address: string |any;
  gender: string |any;
  birthday: string |any
  password: string |any;
  password_confirmation: |any;
  errorMessages: string[] = [];
  constructor(private userService: AuthServiceService,private router:Router) {}
  onSubmit() {

    this.userService.register(this.username, this.email, this.full_name, this.phone,this.address,this.gender,this.birthday, this.password,this.password_confirmation).subscribe(
      (response) => {
        this.router.navigate(['/loginn'])
        alert('Logged in successfully')

      },
      (error) => {
        console.log('register failed:', error);
        alert('Please enter all fields and correct format')
      }
    );

}

}
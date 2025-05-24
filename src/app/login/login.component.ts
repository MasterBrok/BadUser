import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private api: ApiService) { }
  email: string = '';
  password: string = '';


  onSubmit() {
    var body = { userName: this.email, password: this.password };

    this.api.post('Account/Login', body).subscribe({
      next: (response) => {
        console.log(response);
        if (response.Success && response.HttpCode === 200) {
          alert('ورود موفق!');
          this.router.navigate(['/dashboard']);
        }
        else {
          alert("erorr" + response.HttpCode);
        }
      },
      error: (err) => {
        alert('مشکلی پیش آمده. لطفاً دوباره تلاش کنید.');
      }
    });


  }




}

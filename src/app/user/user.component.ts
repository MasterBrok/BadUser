import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserViewModel } from '../../models/UserViewModel';
import { ApiResponse } from '../../models/ApiResponse';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {


  constructor(private api: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.api.checkLogin().then(sender => {
      if (sender) {
        this.users$ = this.getUsers();
      }
      else {
        alert('Auth Error');
        this.router.navigate(['']);
      }
    });
  }

  users$: Observable<UserViewModel[]> | undefined;

  getUsers(): Observable<UserViewModel[]> {
    return this.api.get<UserViewModel[]>('User/Users').pipe(
      map(response => {
        if (response.success && response.httpCode === 200) {
          return response.response;
        } else {
          throw new Error('خطا در دریافت لیست کاربران');
        }
      }));
  }

}

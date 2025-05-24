import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserViewModel } from '../../models/UserViewModel';
import { ApiResponse } from '../../models/ApiResponse';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {


  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.users$ = this.getUsers();
  }

  users$: Observable<UserViewModel[]> | undefined;

  getUsers(): Observable<UserViewModel[]> {
    return this.api.get<UserViewModel[]>('User/Users').pipe(
      map(response => {
        if (response.success && response.response) {
          return response.response;
        } else {
          throw new Error('خطا در دریافت لیست کاربران');
        }
      })
    );
  }

  getUser(id: string) {

    this.api.get('User/GetDetail', `?userId=${id}`);


  }



}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { KvViewModel } from '../../../models/KvViewModel';
import { ApiCall } from '../../services/ApiCall';
import { ApiService } from '../../services/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  onSubmit() {

    let body = this.addForm.value;

    this.api.post('User/AddUser', body)
      .subscribe({
        next: (res) => {
          if (res.httpCode === 200) {
            alert('Added');
            this.route.navigate(['/dashboard']);
          }
          else
            for (let ms of res.messages)
              alert(ms);
        }
      });
  }

  addForm!: FormGroup;

  genders$: Observable<KvViewModel[]> | undefined;
  avatars$: Observable<KvViewModel[]> | undefined;

  constructor(private fb: FormBuilder, private api: ApiService, private call: ApiCall, private route: Router) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required]],
      emailConfirmed: ['', [Validators.required]],
      phonConfirmed: ['', [Validators.required]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      genderId: ['', Validators.required],
      avatarId: ['']
    });

    this.genders$ = this.call.genders();
    this.avatars$ = this.call.avatars();

  }


}

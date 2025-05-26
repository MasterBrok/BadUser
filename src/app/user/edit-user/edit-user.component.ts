import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EditUserViewModel } from '../../../models/UserViewModel';
import { map, Observable } from 'rxjs';
import { KvViewModel } from '../../../models/KvViewModel';
import { ApiCall } from '../../services/ApiCall';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private api: ApiService,private call:ApiCall) {
    this.editForm = this.fb.group({
      id: [''],
      userName: [''],
      phone: [''],
      email: [''],
      emailConfirmed: [false],
      phoneConfirmed: [false],
      genderId: [''],
      roles: [],
      currentRoles: []
    });

    this.userId = this.route.snapshot.queryParamMap.get('id');

  }

  userId: string | null;
  genders$: Observable<KvViewModel[]> | undefined;


  

  ngOnInit(): void {

    alert(this.userId);
    this.genders$ = this.call.genders();

    this.api.get<EditUserViewModel>('User/GetDetail', { userId: this.userId })
      .subscribe({
        next: (user) => {
          this.editForm.patchValue(user.response);
        },
        error: (err) => {
          alert(err);
        }
      });
  }

  onSubmit() {
    let body = this.editForm.value;
    this.api.put('User/EditUser', body)
      .subscribe({
        next: (res) => {
          if (res.httpCode === 200) {
            alert(res.messages[0] ?? 'Nice:)');
          }

          else {
            alert(res.messages[0] ?? 'oops' + "\n" + res.httpCode);
          }
        }
      });
  }

}

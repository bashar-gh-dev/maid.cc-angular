import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { SubSink } from 'subsink';
import { BehaviorSubject, EMPTY, catchError, switchMap, tap } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent implements OnInit, OnDestroy {
  subSink = new SubSink();
  loading$ = new BehaviorSubject(false);
  user$ = new BehaviorSubject<UserModel | undefined>(undefined);
  form = this.fb.group({ userId: [null, [Validators.min(0)]] });

  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.subSink.sink = this.form.valueChanges
      .pipe(
        switchMap((value) => {
          const userId = parseInt(`${value.userId}`);
          if (isFinite(userId)) {
            this.loading$.next(true);
            this.user$.next(undefined);
            return this.usersService.findById(userId).pipe(
              catchError((_e) => {
                this.user$.next(undefined);
                this.loading$.next(false);
                return EMPTY;
              })
            );
          } else {
            this.loading$.next(false);
            this.user$.next(undefined);
            return EMPTY;
          }
        }),
        tap((userResponse) => {
          this.user$.next(userResponse.data);
          this.loading$.next(false);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}

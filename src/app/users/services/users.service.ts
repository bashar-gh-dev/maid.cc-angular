import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { of, tap } from 'rxjs';

type FindByIdResponse = {
  data: UserModel;
  url: string;
  text: string;
};

type FindResponse = {
  data: UserModel[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  private _userCache: { [userId: number]: FindByIdResponse } = {};
  private _usersListCache: { [page: number]: FindResponse } = {};

  findById(userId: number) {
    if (this._userCache[userId]) return of(this._userCache[userId]);
    return this.httpClient
      .get<FindByIdResponse>(`https://reqres.in/api/users/${userId}`)
      .pipe(
        tap((response) => {
          if (response) this._userCache[userId] = response;
        })
      );
  }

  find(page?: number) {
    if (page && this._usersListCache[page])
      return of(this._usersListCache[page]);
    return this.httpClient
      .get<FindResponse>(`https://reqres.in/api/users`, {
        params: { page: page ?? '' },
      })
      .pipe(
        tap((response) => {
          if (response && page) this._usersListCache[page] = response;
        })
      );
  }
}

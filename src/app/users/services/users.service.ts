import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

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

  findById(userId: number) {
    return this.httpClient.get<FindByIdResponse>(
      `https://reqres.in/api/users/${userId}`
    );
  }

  find(page?: number) {
    return this.httpClient.get<FindResponse>(`https://reqres.in/api/users`, {
      params: { page: page ?? '' },
    });
  }
}

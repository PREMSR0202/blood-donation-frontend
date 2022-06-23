import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';
var AWS = require('aws-sdk');

import { environment } from '../../environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  'custom:role': string;
}


@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;
  isLoadingSubject = new Subject<boolean>();
  isLoading = this.isLoadingSubject.asObservable();

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(email: string, password: string): Promise<any> {
    return Auth.signUp({
      username: email,
      password: password,
      attributes: {
        'custom:role': 'user',
      },
    });
  }

  public confirmSignUp(email: string, code: string): Promise<any> {
    return Auth.confirmSignUp(email, code);
  }

  public async signIn(email: string, password: string): Promise<any> {
    await Auth.signIn(email, password);
    this.authenticationSubject.next(true);
  }

  public async signOut(): Promise<any> {
    await Auth.signOut();
    this.authenticationSubject.next(false);
  }

  public async isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {

      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }

  }

  public async getToken(): Promise<any> {
    return Auth.currentSession();
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public async updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
}

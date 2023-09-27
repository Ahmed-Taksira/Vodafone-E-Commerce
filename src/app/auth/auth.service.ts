import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<string>('');

  signIn(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      this.user.next('admin');
    } else if (username === 'user' && password === 'user') {
      this.user.next('user');
    }
  }

  logOut() {
    this.user.next('');
  }
}

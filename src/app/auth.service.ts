import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = true;//await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  login(username: string, password: string) {

    return this.http.post<any>("http://localhost:5500/userinterno/login",{"usuario":username,"contrasenia":password});
  }

  async logout(redirect: string): Promise<void> {
    try {
      //await this.authClient.signOut();
      this.isAuthenticated.next(false);
      await this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
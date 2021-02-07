import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';
import firebase from 'firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dog-hunting';
  users$: Observable<firebase.User>  = this.authService.afUser$;

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }
}

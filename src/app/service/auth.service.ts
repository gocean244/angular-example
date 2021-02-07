import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  afUser$: Observable<firebase.User> = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { 
    this.afUser$.subscribe(user => console.log(user));
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then(result => {
      this.snackBar.open(`${result.user.displayName}様Gitpetへようこそ`, null, {
        duration: 2000,
      });
     })
    .catch(e => console.log(e))
  }

  logout() {
    this.afAuth.signOut()
    .then(() => {
      this.snackBar.open('ログアウトしました', 'OK', {
        duration: 2000,
      });
    })
    .catch(e => console.log(e))
    this.router.navigateByUrl('/welcome');
  }
}

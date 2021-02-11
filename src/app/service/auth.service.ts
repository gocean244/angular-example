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
  uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { 
    this.afUser$.subscribe(user => {
      console.log(user);
      this.uid = user && user.uid;
    });
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then(result => {
      this.snackBar.open(`${result.user.providerData[0].displayName}様Gitpetへようこそ`, null)
     })
    .catch(e => console.log(e))
  }

  logout() {
    this.afAuth.signOut()
    .then(() => {
      this.snackBar.open('ログアウトしました', 'OK')
      this.router.navigateByUrl('/welcome');
    })
    .catch(e => console.log(e))
  }
}

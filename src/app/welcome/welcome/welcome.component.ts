import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.afUser$.subscribe((user) => {
    // ここでユーザーが存在すれば/create にリダイレクトする
      if (user) {
        this.router.navigateByUrl('/create');
      }
    })
  }

  login () {
    this.authService.login();
  }

}

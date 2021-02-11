import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/interface/pet';
import { AuthService } from 'src/app/service/auth.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pet$:Observable<Pet> = this.petService.getPet(this.authService.uid);

  constructor(
    private petService: PetService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}

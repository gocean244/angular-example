import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService } from 'src/app/service/auth.service';
import { PetService } from 'src/app/services/pet.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  petIds = [...Array(10)].map((_, i) => i + 1);

  config: SwiperConfigInterface  = {
    loop: true,
    navigation: true,
    pagination: {
      el: '.pager',
      clickable: true,
    },
    centeredSlides: true,
    slidesPerView: 3,
  };

  selectedPetId: number = 0;

  form = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(40),
    ]],
    gender: ['',[
      Validators.required,
      Validators.pattern(/male|female/)
    ]],
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value);
    console.log(this.selectedPetId);
    const formData = this.form.value;
    this.petService.createPet({
      petImageId: this.selectedPetId + 1,
      name: formData.name,
      level: 1,
      exp: 0,
      trainerId: this.authService.uid,
      gender: formData.gender,
    });
  }

}

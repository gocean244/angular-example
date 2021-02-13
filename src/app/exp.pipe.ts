import { Pipe, PipeTransform } from '@angular/core';
import { Pet } from './interface/pet';

const expTable = [
  20,
  40,
  100,
  250,
  500,
  1000,
  1500,
  4000,
  10000,
];

@Pipe({
  name: 'exp'
})
export class ExpPipe implements PipeTransform {

  transform(pet: Pet, type: 'percent' | 'label'): unknown {
    const totalExp: number = pet.exp;
    const level: number = pet.level;
    const baseExp: number = expTable[level - 2] || 0;
    const nextExp: number = expTable[level - 1] - baseExp;
    const exp: number = totalExp - baseExp;

    if(type === 'percent') {
      return exp / nextExp * 100;
    } else {
      return exp + ' / ' + nextExp;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { AddAnimal } from './animal.actions';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
  }

  public addAnimal(name: string): void {
    this.store.dispatch(new AddAnimal(name)).subscribe(() => {
      console.warn('AnimalsComponent', 'added ' + name);
    });
  }

}

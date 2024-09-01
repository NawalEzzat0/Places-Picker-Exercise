import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Place } from './place.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [NgFor],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css',]
})
export class PlacesComponent {
  // places = input.required<Place[]>();
  @Input({required:true}) places!:Place[];
  @Output()selectedPlace=new EventEmitter<Place>();

  onSelectPlace(place: Place) {
    this.selectedPlace.emit(place)
  }
  trackById(index:number,place:Place){
    return place.id
  }
}

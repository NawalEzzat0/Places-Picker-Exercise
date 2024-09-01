import { Component, DestroyRef, inject } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrls:[ './user-places.component.css',],
  imports: [PlacesContainerComponent, PlacesComponent,NgFor,NgIf],
})
export class UserPlacesComponent {
  private httpClient=inject(HttpClient);
  private destroyRef=inject(DestroyRef)
  isFetching=false
  private placeService=inject(PlacesService)
  places=this.placeService.loadedUserPlaces;

  ngOnInit(){
    this.isFetching=true;
  let subscribtion=this.placeService.loadUserPlaces()
  .subscribe({
      complete:()=>{
        this.isFetching=false
      }
    })
    this.destroyRef.onDestroy(()=>{
      subscribtion.unsubscribe()
    })
  }
  onRemovePlace(place:Place)
  {
    this.placeService.removeUserPlace(place).subscribe()
  }

}

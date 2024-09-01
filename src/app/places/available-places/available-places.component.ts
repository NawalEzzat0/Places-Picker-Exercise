import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrls:[ './available-places.component.css',],
  imports: [PlacesComponent, PlacesContainerComponent,NgFor,NgIf],
})
export class AvailablePlacesComponent implements OnInit {
  
  places:Place[]|undefined =undefined;
  private destroyRef=inject(DestroyRef)
  isFetching=false;
  private placeService=inject(PlacesService)
  
  ngOnInit(){
    this.isFetching=true;
  let subscribtion=this.placeService.loadAvailablePlaces() 
  .subscribe({
      next:(places)=>{
        this.places=places;
        
      },
      complete:()=>{
        this.isFetching=false
      }
    })
    this.destroyRef.onDestroy(()=>{
      subscribtion.unsubscribe()
    })
  }

  onSelectPlace(selectedPlace:Place) {
    let subscribtion= this.placeService.addPlaceToUserPlaces(selectedPlace).pipe(
      map((respdata)=>respdata.places)
    )
    .subscribe({
      next:(response)=>{console.log(response);
        this.places=response
      }
    });
    this.destroyRef.onDestroy(()=>{
      subscribtion.unsubscribe()
    })
  }
}

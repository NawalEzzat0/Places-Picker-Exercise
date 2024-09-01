import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import {ErrorService} from '../shared/error.service'
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient=inject(HttpClient);
      private errorService=inject(ErrorService)
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces("http://localhost:3000/places")
  }

  loadUserPlaces() {
    return this.fetchPlaces("http://localhost:3000/user-places").pipe(
      tap({
        next:(userPlaces)=>{this.userPlaces.set(userPlaces)}
      })
    )
  }

  addPlaceToUserPlaces(places: Place) {

    const prevPlace=this.userPlaces()
    if(!prevPlace.some((p)=>p.id===places.id))
    {

      this.userPlaces.set([...prevPlace,places])
    }
    return this.httpClient.put<{places:Place[]}>("http://localhost:3000/user-places",{
      placeId:places.id
    }) .pipe(
      catchError((err)=>{
        this.userPlaces.set(prevPlace)
        this.errorService.showError('Failed to store selected place')
        return throwError(()=>new Error('Failed to store selected place'))
      })
    )
  }

  removeUserPlace(place: Place) {
    const prevPlace=this.userPlaces()

    if(prevPlace.some((p)=>p.id===place.id))
      {
  
        this.userPlaces.set(prevPlace.filter(p=>p.id!==place.id))
      }
      return this.httpClient.delete("http://localhost:3000/user-places/"+place.id).pipe(
        catchError((err)=>{
          this.userPlaces.set(prevPlace)
          this.errorService.showError('Failed to remove selected place')
          return throwError(()=>new Error('Failed to remove selected place'))
        })
      )
  }


  fetchPlaces(url:string)
  {
    return this.httpClient.get<{places:Place[]}>(url)
    .pipe(
      map((respdata)=>respdata.places)
    )
  }
}

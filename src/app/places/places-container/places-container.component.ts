import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-places-container',
  standalone: true,
  imports: [],
  templateUrl: './places-container.component.html',
  styleUrls: ['./places-container.component.css']
})
export class PlacesContainerComponent {
  @Input({required:true}) title !: string
}

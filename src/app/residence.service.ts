import { Injectable } from '@angular/core';
import { Residence } from './residence.model';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ResidenceService {
  private residences: Residence[] = [
    { id: 1, name: 'Résidence A', address: 'Rue 123', image: 'assets/imageA.png', status: 'Disponible' },
    { id: 2, name: 'Résidence B', address: 'Mourouj', image: 'assets/image.png', status: 'En Construction' },
    { id: 3, name: 'Résidence C', address: 'Rue 456', image: 'assets/imageC.png', status: 'Vendu' },
  ];
  constructor(private http:HttpClient) {}

  getResidences(): Residence[] {
    return [...this.residences];
  }
  getResidenceList():Observable<Residence[]>{
    return this.http.get<Residence[]>('http://localhost:3000/residences')
  }
  addResidence(residence: Residence): void {
    const newId = this.residences.length + 1;
    this.residences.push({ ...residence, id: newId });
  }

  getResidenceById(id: number): Residence | null {
    return this.residences.find(res => res.id === id) || null;
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarvelHero } from '../Marvel.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelServiceService {
  // private marvelUrl = "https://gateway.marvel.com:443/v1/public/characters"
  private marvelUrl = "http://localhost:8080/api/characters"
  constructor(private http: HttpClient) { }
  getHeroName(name : string, limit: number = 20, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      // .set("ts", 1)
      .set("name", name)
      .set("limit", limit)
      .set("offset", offset)
      // .set("apikey", "b5d7734b1a89b586ce8356c71d982d47")
      // .set("hash", "c5850daa28b32b501997f0a61dd4eabc")

    return this.http.get(this.marvelUrl, {params})
  }

  // heroEvent = new Subject<string[]>()
  // emitHeroes(heroes: string[]){
  //   return this.heroEvent.next(heroes)
  // }

  heroList: Array<string> = []
  saveList(hero: any) {
    this.heroList = hero
  }

  retrieveHero() {
    return this.heroList
  }

}

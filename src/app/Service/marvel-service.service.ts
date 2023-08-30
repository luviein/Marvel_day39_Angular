import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarvelHero } from '../Marvel.model';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelServiceService {
  // private marvelUrl = "https://gateway.marvel.com:443/v1/public/characters"
  // private marvelUrl = "http://localhost:8080/api/characters"
  // private getOneHeroUrl = "http://localhost:8080/api/character/{id}"
  // private commentsUrl = "http://localhost:8080/api/comment"

  private marvelUrl = "domineering-cellar-production.up.railway.app/api/characters"
  private getOneHeroUrl = "domineering-cellar-production.up.railway.app/api/character/{id}"
  private commentsUrl = "domineering-cellar-production.up.railway.app/api/comment"

  constructor(private http: HttpClient) { }
  getHeroName(name : string, limit: number = 20, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      // .set("ts", 1)
      .set("name", name)
      .set("limit", limit)
      .set("offset", offset)
      // .set("apikey", "b5d7734b1a89b586ce8356c71d982d47")
      // .set("hash", "c5850daa28b32b501997f0a61dd4eabc")

    return this.http.get<MarvelHero[]>(this.marvelUrl, {params})
  }

  getOneHero(id: number) {
    const url = this.getOneHeroUrl.replace('{id}', id.toString()); // Replace the placeholder
    const params = new HttpParams()
      .set("id", id.toString())


    return this.http.get(this.getOneHeroUrl, {params})
  }

  postComments(commentData : any) {
    return this.http.post(this.commentsUrl, commentData)
  }

  getComments(id: any) : Promise<string[]> {
    const params = new HttpParams()
    // .set("ts", 1)
    .set("id", id)
    return firstValueFrom(this.http.get<string[]>("/api/getComment", { params }));
  }



  heroList: any = []
  saveList(hero: any) {
    this.heroList = hero
  }

  retrieveHero() {
    return this.heroList
  }

  commentList: any = []
  saveComments(comments: any) {
    this.commentList = comments
    console.log("in comment list service", this.commentList)
  }

  retrieveComments() {
    return this.commentList
  }

  heroName: string = ""
  saveHero(hero: string) {
    this.heroName = hero
  }

  retrieveHeroName() {
    return this.heroName
  }

  heroId!: number
  saveId(hero: number) {
    this.heroId = hero
  }

  retrieveId() {
    return this.heroId
  }

}

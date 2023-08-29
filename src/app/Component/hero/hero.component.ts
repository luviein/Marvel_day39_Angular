import { SoundData } from 'kaboom';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MarvelServiceService } from 'src/app/Service/marvel-service.service';
import { MarvelHero } from 'src/app/Marvel.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private svc: MarvelServiceService, private title : Title, private router: Router) {}

  hero_id!: number
  sub$!: Subscription

  // to set result as MarvelHero model
  heroData: MarvelHero | undefined;

  ngOnInit(): void {
      this.hero_id = +this.activatedRoute.snapshot.params['id']
      this.svc.saveId(this.hero_id)
      console.log("hero id>>>>", this.hero_id)
      this.sub$ = this.svc.getOneHero(this.hero_id).subscribe({
        next: result => {
          this.heroData = result as MarvelHero
          console.log("hero data >>>>>",this.heroData.characterName)
          this.title.setTitle(this.heroData.characterName)
        }
      })
  }

  inputComment() {

    this.svc.saveHero(this.heroData.characterName)
    this.router.navigate(['comments'])

  }

}

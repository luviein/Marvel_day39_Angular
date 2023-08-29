import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MarvelServiceService } from 'src/app/Service/marvel-service.service';
import { Comments, MarvelHero } from 'src/app/Marvel.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private svc: MarvelServiceService,
    private title: Title,
    private router: Router

  ) {}

  hero_id!: number;
  sub$!: Subscription;
  sub2$!: Subscription;

  // to set result as MarvelHero model
  heroData: MarvelHero | undefined;
  comments: Comments[] = [];

  // OnInit is paused @await until the try block is completed
  // hero id will still run first
  async ngOnInit(): Promise<void> {
    this.hero_id = +this.activatedRoute.snapshot.params['id'];
    this.svc.saveId(this.hero_id);
    console.log("hero id>>>>", this.hero_id);

    try {
      const result = await this.svc.getComments(this.hero_id.toString());
      console.log('Received comments data:', result);

       // Parse each JSON string into an array of objects
       // HTTP call is returning an array of JSON strings (which is one item)
      this.comments = result.map(jsonString => {
        const parsedComment = JSON.parse(jsonString) as Comments;
        console.log("parsed comment >>>>", parsedComment)
        return parsedComment;
      });

    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    console.log(this.comments)

    this.sub$ = this.svc.getOneHero(this.hero_id).subscribe({
      next: result => {
        this.heroData = result as MarvelHero;
        console.log("hero data >>>>>", this.heroData.characterName);
        this.title.setTitle(this.heroData.characterName);
      }
    });
  }

  inputComment() {
        this.svc.saveHero(this.heroData.characterName);
        this.router.navigate(['comments']);
      }

  // ... other methods
}


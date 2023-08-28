import { ChangeDetectorRef, Component, Input, NgZone, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoundData } from 'kaboom';
import { Subject, Subscription, Observable } from 'rxjs';
import { MarvelServiceService } from 'src/app/Service/marvel-service.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  // @Output()
  // receivedHeroList = new Subject<string[]>()
  @Input()
  receivedHeroList!: string[]

  heroList: string[] = []
  sub$!: Subscription

  constructor(private svc : MarvelServiceService,private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {

    console.log("retrieved >>>>>",this.svc.retrieveHero())
    this.heroList = this.svc.retrieveHero()
    // this.sub$ = this.svc.heroEvent.subscribe(names => {
    //   console.log(">>>>>>>",names)
    //   this.heroList = names

    //   console.log(">>> hero list component", this.receivedHeroList)
    // })
    // this.receivedHeroList$ = this.svc.heroEvent
    // console.log("list >>>>>>", this.receivedHeroList$)
    this.display()
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  display(){
    console.log(this.heroList)
  }
}
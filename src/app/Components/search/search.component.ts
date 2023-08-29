import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { MarvelServiceService } from 'src/app/Service/marvel-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private fb: FormBuilder, private svc: MarvelServiceService, private router: Router) {}
  form!: FormGroup
  sub$!: Subscription
  heroArray: string[] = []

  @Output()
  emitHeroes = new Subject<string[]>()

  ngOnInit(): void {
      this.form = this.fb.group({
        name: this.fb.control<string> ("", [Validators.required])
      })
  }

  process() {
    const value: string = this.form.value.name
    // console.log("hero name")
    console.log("comment >>>>>", value)
    this.sub$ = this.svc.getHeroName(value).subscribe({
      next: result => {
        console.info(result)
        result.forEach(hero =>{
          this.heroArray.push(hero)
        })
        // console.log(">> in hero array: ", this.heroArray)

        // const heroes = Object.assign({}, this.heroArray);
        // console.log("const heroes >>>>", heroes)

        // pushes data to the hero event service to transmit to next component
        this.emitHeroes.next(this.heroArray)
        this.svc.saveList(this.heroArray)
        this.router.navigate(['herolist'])
      },
      error: error => {"Failed" + JSON.stringify(error)},
      complete: () => {this.sub$.unsubscribe()}
    })

  }

}


// method 1

// retrieve view 0, display in view 1

// navigate to view 1 and retrieve & display (preferrred)
// pass info from v0 > v1 (path variable, query string , service)

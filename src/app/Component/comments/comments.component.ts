import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MarvelServiceService } from 'src/app/Service/marvel-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private svc : MarvelServiceService, private fb : FormBuilder) {}

  heroName!: string
  form!: FormGroup

  ngOnInit(): void {
    this.heroName = this.svc.retrieveHeroName()
    this.createForm()

  }

  createForm() {
    this.form = this.fb.group({
      comments: this.fb.control<string>("", [Validators.required])
    })
  }

  process() {
    const commentData = {
      hero_id: this.svc.retrieveId(),
      heroName: this.heroName,
      comments: this.form.value.comments
    }
    console.log("commentdata >>>>>>>",commentData)
    this.svc.postComments(commentData).subscribe(response => {
      console.log(response)
    })
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { MarvelServiceService } from './Service/marvel-service.service';
import { SearchComponent } from './Components/search/search.component';
import { HeroListComponent } from './Component/hero-list/hero-list.component';
import { HeroComponent } from './Component/hero/hero.component';
import { CommentsComponent } from './Component/comments/comments.component';

const appRoutes : Routes = [
  {path: "", component:SearchComponent, title:"Search For A Hero"},
  {path:"herolist", component: HeroListComponent},
  {path: "herolist/:id", component: HeroComponent},
  {path: "comments", component: CommentsComponent, title: "Your Comment"}
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeroListComponent,
    HeroComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [MarvelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, IonInfiniteScrollContent, LoadingController } from '@ionic/angular';

import { MovieService } from 'src/app/service/movie.service';
import { environment } from 'src/environments/environment';
import {ApiResult} from '../../service/movie.service'
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies:any = [{"adult":false,"backdrop_path":"/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg","genre_ids":[16,12,35,10751],"id":315162,"original_language":"en","original_title":"Puss in Boots: The Last Wish","overview":"Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.","popularity":2531.473,"poster_path":"/kuf6dutpsT0vSVehic3EZIqkOBt.jpg","release_date":"2022-12-07","title":"Puss in Boots: The Last Wish","video":false,"vote_average":8.4,"vote_count":4541}];
  currentpage=1;
  imagesBaseUrl = 'http://image.tmdb.org/t/p';

  constructor(private movieService:MovieService,private lodingCtrl:LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?:InfiniteScrollCustomEvent){
    const loding = await this.lodingCtrl.create({
      message:'Loding...',
      spinner:'bubbles',
    })
    await loding.present();


    this.movieService.getTopRatedMovies(this.currentpage).subscribe(res=>{
      loding.dismiss();
      console.log(res.results);
      
      // Array.prototype.push.apply(this.movies,res.results);
      // this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      console.log(this.movies)
      event?.target.complete();
    });
  }

  loadMore(event:InfiniteScrollCustomEvent){
    this.currentpage++;
    this.loadMovies(event);
  }

}

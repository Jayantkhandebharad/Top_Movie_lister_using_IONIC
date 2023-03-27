import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie:any = null;
  constructor(private route:ActivatedRoute,private movieService:MovieService) { }

  ngOnInit() {
    
    let id:string | null =null;
    id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id!==null){
    this.movieService.getMovieDetails(id).subscribe((res)=>{
      this.movie = res;
      console.log(this.movie);
    });
    }

  }

  
  onBackButtonClicked() {
    history.back();
  }

}

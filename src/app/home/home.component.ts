import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movie } from '../models/movie';
import { query } from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Array<Movie> = new Array<Movie>();
  filteredMovies: Array<Movie> = new Array<Movie>();
  tvShows: Array<Movie> = new Array<Movie>();
  filteredTvShows: Array<Movie> = new Array<Movie>();
  moviesActive = true;
  query = '';

  constructor(private movieService: MovieService) {
   }

  ngOnInit() {
    this.movieService.getMovies().subscribe(x => this.movies = x);
    this.movieService.getTVShows().subscribe(x => this.tvShows = x);
    this.filteredMovies = this.movies;
    this.filteredTvShows = this.tvShows;
  }

  setActive(activeTab: string) {
    if (activeTab === 'M') {
      this.moviesActive = true;
    } else {
      this.moviesActive = false;
    }
  }

  search() {
    if (this.query === '' || this.query.length < 3) {
      this.filteredMovies = this.movies;
      this.filteredTvShows = this.tvShows;
    } else {
      this.filteredMovies = this.movies.filter(item => JSON.stringify(item).toLowerCase().includes(this.query));
      this.filteredTvShows = this.tvShows.filter(item => JSON.stringify(item).toLowerCase().includes(this.query));
    }
  }

  onRatingChange(rating: number, movie: Movie) {
    console.log(rating, movie);
  }

}

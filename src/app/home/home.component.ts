import { Component, OnInit, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movie, MovieType } from '../models/movie';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { ClickEvent } from 'angular-star-rating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  movies: Array<Movie> = new Array<Movie>();
  filteredMovies: Array<Movie> = new Array<Movie>();
  tvShows: Array<Movie> = new Array<Movie>();
  filteredTvShows: Array<Movie> = new Array<Movie>();
  moviesActive = true;
  query = '';
  moviesCounter = 1;
  tvShowsCounter = 1;
  isLoading = true;

  constructor(private movieService: MovieService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.movieService.getMovies(10, 0).subscribe(x => {
      this.movies = x;
      this.filteredMovies = x;
    });

    this.movieService.getMovies(10, 1).subscribe(x => {
      this.tvShows = x;
      this.filteredTvShows = x;
    });
  }

  ngAfterViewChecked(): void {
    this.isLoading = false;
  }

  setActive(activeTab: string) {
    if (activeTab === 'M') {
      this.moviesActive = true;
    } else {
      this.moviesActive = false;
    }
  }

  loadMore() {
    if (this.moviesActive) {
      this.moviesCounter++;
      this.movieService.getMovies(this.moviesCounter * 10, 0).subscribe(x => {
        this.movies = x;
        this.filteredMovies = x;
      });
    } else {
      this.tvShowsCounter++;
      this.movieService.getMovies(this.tvShowsCounter * 10, 1).subscribe(x => {
        this.tvShows = x;
        this.filteredTvShows = x;
      });
    }
  }

  getActors(actors: Array<string>): string {
    let actorsString = '';
    actors.forEach(element => {
      actorsString += element.toString() + ', ';
    });
    return actorsString.substring(0, actorsString.length - 2);
  }

  search() {
    if (this.query === '' || this.query.length < 3) {
      this.filteredMovies = this.movies;
      this.filteredTvShows = this.tvShows;
    } else if (this.query.includes('at least')) {
      const stars = parseInt(this.query[9], 10);
      this.filteredMovies = this.movies.filter(item => item.rating >= stars);
      this.filteredTvShows = this.tvShows.filter(item => item.rating >= stars);
    } else if (this.query.includes('older than')) {
      const year = parseInt(this.query.substring(11, 16), 10);
      this.filteredMovies = this.movies.filter(item => item.releaseDate.getFullYear() < year);
      this.filteredTvShows = this.tvShows.filter(item => item.releaseDate.getFullYear() < year);
    } else if (this.query.includes('after')) {
      const year = parseInt(this.query.substring(6, 10), 10);
      this.filteredMovies = this.movies.filter(item => item.releaseDate.getFullYear() > year);
      this.filteredTvShows = this.tvShows.filter(item => item.releaseDate.getFullYear() > year);
    } else if (this.query.includes('stars')) {
      const stars = parseInt(this.query.substring(0, 2), 10);
      this.filteredMovies = this.movies.filter(item => Math.floor(item.rating) === stars);
      this.filteredTvShows = this.tvShows.filter(item => Math.floor(item.rating) === stars);
    } else {
      this.filteredMovies = this.movies.filter(item => JSON.stringify(item).toLowerCase().includes(this.query));
      this.filteredTvShows = this.tvShows.filter(item => JSON.stringify(item).toLowerCase().includes(this.query));
    }
  }

  onRatingChange(rating: ClickEvent, movie: Movie) {
    if (!this.authService.isAuthenticated()) {
      if (confirm('You should be logged to perform this action, do you want to login?')) {
        this.router.navigate(['login']);
      }
    } else {
      this.movieService.rateMovie(rating.rating, movie).subscribe(x => x);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMovies(numberOfItemsToTake: number = 10, movieType: number = 2): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(`https://localhost:44337/api/movie/${numberOfItemsToTake}/${movieType}`).pipe(map(x => x));
  }

  rateMovie(rating: number, movie: Movie): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    };
    return this.http.patch(`https://localhost:44337/api/movie/${movie.id}`, rating, httpOptions)
    .pipe(map(x => x), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

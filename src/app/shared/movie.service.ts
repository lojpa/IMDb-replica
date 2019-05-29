import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  testExtractDate; // just demo purposes only

  getMovies(count: number = 10): Observable<Array<Movie>> {

    if (count === 10) {
      return of([
        // tslint:disable-next-line:max-line-length
        new Movie('1', 'Godzilla: King of the Monsters (2019)', 'The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.', ['Kyle Chandler', 'Vera Farmiga'], './assets/images/godzilla.jpg', 2.5),
        // tslint:disable-next-line:max-line-length
        new Movie('2', 'Rocketman (2019)', 'A musical fantasy about the fantastical human story of Elton John\'s breakthrough years.', ['Taron Egerton', 'Jamie Bell'], './assets/images/rocketman.jpg', 3.2),
        new Movie('3', 'Test movie 3', 'Description 3', ['dejo3', 'test3'], './assets/images/godzilla.jpg', 2.8),
        new Movie('4', 'Test movie 4', 'Description 4', ['dejo4', 'test4'], './assets/images/rocketman.jpg', 4.5),
        new Movie('5', 'Test movie 5', 'Description 5', ['dejo5', 'test5'], './assets/images/godzilla.jpg', 3.9),
        new Movie('6', 'Test movie 6', 'Description 6', ['dejo6', 'test6'], './assets/images/rocketman.jpg', 3.1),
        // tslint:disable-next-line:max-line-length
        new Movie('7', 'Rocketman (2019)', 'A musical fantasy about the fantastical human story of Elton John\'s breakthrough years.', ['Taron Egerton', 'Jamie Bell'], './assets/images/rocketman.jpg', 3.2),
        new Movie('8', 'Test movie 3', 'Description 3', ['dejo3', 'test3'], './assets/images/godzilla.jpg', 2.8),
        new Movie('9', 'Test movie 4', 'Description 4', ['dejo4', 'test4'], './assets/images/rocketman.jpg', 4.5),
        new Movie('10', 'Test movie 5', 'Description 5', ['dejo5', 'test5'], './assets/images/godzilla.jpg', 3.9),
      ]);
    }

    if (count === 20) {
      return of([
        // tslint:disable-next-line:max-line-length
        new Movie('1', 'Godzilla: King of the Monsters (2019)', 'The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.', ['Kyle Chandler', 'Vera Farmiga'], './assets/images/godzilla.jpg', 2.5),
        // tslint:disable-next-line:max-line-length
        new Movie('2', 'Rocketman (2019)', 'A musical fantasy about the fantastical human story of Elton John\'s breakthrough years.', ['Taron Egerton', 'Jamie Bell'], './assets/images/rocketman.jpg', 3.2),
        new Movie('3', 'Test movie 3', 'Description 3', ['dejo3', 'test3'], './assets/images/godzilla.jpg', 2.8),
        new Movie('4', 'Test movie 4', 'Description 4', ['dejo4', 'test4'], './assets/images/rocketman.jpg', 4.5),
        new Movie('5', 'Test movie 5', 'Description 5', ['dejo5', 'test5'], './assets/images/godzilla.jpg', 3.9),
        new Movie('6', 'Test movie 6', 'Description 6', ['dejo6', 'test6'], './assets/images/rocketman.jpg', 3.1),
        // tslint:disable-next-line:max-line-length
        new Movie('7', 'Rocketman (2019)', 'A musical fantasy about the fantastical human story of Elton John\'s breakthrough years.', ['Taron Egerton', 'Jamie Bell'], './assets/images/rocketman.jpg', 3.2),
        new Movie('8', 'Test movie 3', 'Description 3', ['dejo3', 'test3'], './assets/images/godzilla.jpg', 2.8),
        new Movie('9', 'Test movie 4', 'Description 4', ['dejo4', 'test4'], './assets/images/rocketman.jpg', 4.5),
        new Movie('10', 'Test movie 5', 'Description 5', ['dejo5', 'test5'], './assets/images/godzilla.jpg', 3.9),
        // tslint:disable-next-line:max-line-length
        new Movie('11', 'Godzilla: King of the Monsters (2019)', 'The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.', ['Kyle Chandler', 'Vera Farmiga'], './assets/images/godzilla.jpg', 2.5),
        // tslint:disable-next-line:max-line-length
        new Movie('12', 'Rocketman (2019)', 'A musical fantasy about the fantastical human story of Elton John\'s breakthrough years.', ['Taron Egerton', 'Jamie Bell'], './assets/images/rocketman.jpg', 3.2),
        new Movie('13', 'Test movie 3', 'Description 3', ['dejo3', 'test3'], './assets/images/godzilla.jpg', 2.8),
        new Movie('14', 'Test movie 4', 'Description 4', ['dejo4', 'test4'], './assets/images/rocketman.jpg', 4.5),
        new Movie('15', 'Test movie 5', 'Description 5', ['dejo5', 'test5'], './assets/images/godzilla.jpg', 3.9),
        new Movie('16', 'Test movie 6', 'Description 6', ['dejo6', 'test6'], './assets/images/rocketman.jpg', 3.1),
        // tslint:disable-next-line:max-line-length
        new Movie('17', 'Rocketman (2019)', 'A musical fantasy about the fantastical human story of Elton John\'s breakthrough years.', ['Taron Egerton', 'Jamie Bell'], './assets/images/rocketman.jpg', 3.2),
        new Movie('18', 'Test movie 3', 'Description 3', ['dejo3', 'test3'], './assets/images/godzilla.jpg', 2.8),
        new Movie('19', 'Test movie 4', 'Description 4', ['dejo4', 'test4'], './assets/images/rocketman.jpg', 4.5),
        new Movie('20', 'Test movie 5', 'Description 5', ['dejo5', 'test5'], './assets/images/godzilla.jpg', 3.9),
      ]);
    }
  }

  getTVShows(): Observable<Array<Movie>> {
    return of([
      // tslint:disable-next-line:max-line-length
      new Movie('1', 'Godzilla - TV/Show: King of the Monsters (2019)', 'The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.', ['Kyle Chandler', 'Vera Farmiga'], './assets/images/godzilla.jpg'),
      // tslint:disable-next-line:max-line-length
      new Movie('2', 'Rocketman (2019) - TV/Show', 'A musical fantasy about the fantastical human story of Elton John\'s breakthrough years.', ['Taron Egerton', 'Jamie Bell'], './assets/images/rocketman.jpg'),
      new Movie('3', 'Test movie 3 - TV/Show', 'Description 3', ['dejo3', 'test3'], './assets/images/godzilla.jpg'),
      new Movie('4', 'Test movie 4 - TV/Show', 'Description 4', ['dejo4', 'test4'], './assets/images/rocketman.jpg'),
      new Movie('5', 'Test movie 5 - TV/Show', 'Description 5', ['dejo5', 'test5'], './assets/images/godzilla.jpg'),
      new Movie('6', 'Test movie 6 - TV/Show', 'Description 6', ['dejo6', 'test6'], './assets/images/rocketman.jpg')
    ]);
  }

  getConfig() { // just demo purposes only
    return this.http.get<string>('this.configUrl')
      .pipe(
        map(this.testExtractDate),
        catchError(this.handleError)
      );
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

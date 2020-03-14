import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
const base_url = "http://54.85.124.206";
@Injectable()
export class AppService {
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  constructor(private http: HttpClient) {}

  getDataForKeyword(search_for, payload) {
    let url =
      search_for == "Book"
        ? base_url + ":5000/search-text"
        : base_url + ":8000/search-notes";
    return this.http
      .post<any>(url, JSON.stringify(payload), httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getSubjectsForSession"))
      );
  }

  saveNoteForKeyword(payload) {
    let url = base_url + ":8000/save-notes";
    return this.http
      .post<any>(url, JSON.stringify(payload), httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getSubjectsForSession"))
      );
  }
  
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

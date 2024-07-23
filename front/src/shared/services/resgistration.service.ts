import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Registration } from '../models/regitration.interface';

@Injectable({
  providedIn: 'root'
})
export class ResgistrationService {

  private apiUrl = 'http://localhost:8080/api/v1/registration/';

  registration$: BehaviorSubject<Registration[]> = new BehaviorSubject([{
    name: '',
    surname: '',
    email: ''
  },]);

  registrationList?: Registration[];

  isOnline$ = new BehaviorSubject<boolean>(window.navigator.onLine);

  constructor(private http: HttpClient) {
    this.listenToOnlineStatus();
    this.firstLoad();
  }

  listenToOnlineStatus(): void {
    window.addEventListener('online', () => this.isOnline$.next(true));
    window.addEventListener('offline', () => this.isOnline$.next(false));
  }

  register(user: Registration): void {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    // return this.http.post<Registration>(this.apiUrl, user, { headers: headers }).pipe(
    //   catchError(this.handleError<Registration>('register'))
    // );
    const storageId = Date.now().toString();
    localStorage.setItem(storageId, JSON.stringify(user));
    // this.getRegistration();
    // return new Observable<Registration>;
  }

  update(user: Registration): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    this.http.post<Registration>(this.apiUrl + 'synch', user, { headers: headers }).pipe(
      catchError(this.handleError<Registration>('update'))
    ).subscribe({
      next: (response) => {

      },
      error: (error) => {
        // console.error('There was an error registering the user:', error);

      }
    });
  }

  getAll(): Observable<Registration[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Registration[]>(this.apiUrl + 'all', { headers: headers }).pipe(
      tap((registration: Registration[]) => {
        return this.registration$.next(registration);
      })
    ).pipe(
      catchError(this.handleError<Registration[]>('getAll'))
    )

  }

  getRegistration(): Registration[] {
    let finds: Registration[] = [];

    if (localStorage.length === 0) {
      return [];
    }

    for (var i = 0; i < localStorage.length; i++) {
      // console.log("test", localStorage.getItem(localStorage.key(i)!));


      try {
        finds?.push(JSON.parse(localStorage.getItem(localStorage.key(i)!)!));

      } catch (err) {
        // console.log(err);
      }

    }
    this.registrationList = finds;
    this.synch();

    return finds;
  }

  synch(): void {
    if (window.navigator.onLine) {
      // console.log("je synchronise");
      // let alls: Registration[] = [];

      // console.log(this.registrationList);
      this.registrationList?.forEach(


        registrationItem => {

          // console.log("eee", registrationItem);
          this.update(registrationItem);


        }
      );
      // window.location.reload();
    }

    // console.log("off line");


  }

  firstLoad(): void {
    if (window.navigator.onLine) {
      let findds: Registration[] = [];
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this.http.get<Registration[]>(this.apiUrl + 'all', { headers: headers }).pipe(
        tap((registration: Registration[]) => {
          return this.registration$.next(registration);
        })
      ).subscribe({
        next: (response) => {
          // console.log('Users successfully get:', response);

          localStorage.clear();

          response.forEach(
            (regis, index) => {

              localStorage.setItem(Date.now().toString() + index, JSON.stringify(regis));
            }
          )
          this.registrationList = response;
          // console.log("storage complete", localStorage);

          return response;

        }
      });
    }


  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      return of(result as T);
    };
  }
}

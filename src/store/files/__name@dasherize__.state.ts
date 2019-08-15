import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createQuery, createStore } from '@datorama/akita';
import { tap } from 'rxjs/operators';

interface <%= classify(name) %> {

}

function createInitialState(): <%= classify(name) %> {
  return {};
}

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>State {
  private store = createStore<<%= classify(name) %>>(createInitialState(), { name: '<%= dasherize(name) %>' });
  private query = createQuery<<%= classify(name) %>>(this.store);

  public data$ = this.query.select();

  get data() {
    return this.query.getValue();
  }

  constructor(
    private http: HttpClient,
  ) { }

  get() {
    const params = new HttpParams();
    return this.http.get <<%= classify(name) %>> ('api/<%= dasherize(name) %>', { params }).pipe(
      tap(data => this.store.set(data)),
    );
  }
}


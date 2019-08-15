import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
<% if (active) { %>import { ActiveState, createEntityQuery, createEntityStore, EntityState } from '@datorama/akita';<% } else { %>import { createEntityQuery, createEntityStore, EntityState } from '@datorama/akita';<% } %>
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

export interface <%= classify(name) %> {

}
<% if (active) { %>
function createInitialState() {
  return {
    active: null,
  };
}

interface <%= classify(name) %>EntityState extends EntityState<<%= classify(name) %>>, ActiveState { }
<% } else { %>
function createInitialState() {
  return {
  };
}
interface <%= classify(name) %>EntityState extends EntityState<<%= classify(name) %>> { }
<% } %>
@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>sState {
  private store = createEntityStore<<%= classify(name) %>EntityState>(createInitialState(), { name: '<%= dasherize(name) %>s', idKey: '<%= idKey %>' });
  private query = createEntityQuery<<%= classify(name) %>EntityState>(this.store, {});

  public all$: Observable<<%= classify(name) %>[]> = this.query.selectAll();
  public count$: Observable<number> = this.query.selectCount();
<% if (active) { %>
  public active$ = this.query.selectActive() as Observable<<%= classify(name) %>>;

  get active(): <%= classify(name) %> {
    return this.query.getActive() as <%= classify(name) %>;
  }
<% } %>
  constructor(
    private http: HttpClient,
  ) { }

  get() {
    const params = new HttpParams();
    return this.http.get <<%= classify(name) %>[]> ('api/<%= dasherize(name) %>', { params }).pipe(
      tap(balances => this.store.update({ balances })),
    );
  }
}


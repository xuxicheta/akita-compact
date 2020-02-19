import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
<% if (active) { %>import { ActiveState, createEntityQuery, createEntityStore, EntityState, ID } from '@datorama/akita';<% } else { %>import { createEntityQuery, createEntityStore, EntityState } from '@datorama/akita';<% } %>
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { <%= classify(name) %> } from 'src/models';

<% if (active) { %>
const initialState = (): <%= classify(name) %> => ({
  active: null,
});

interface <%= classify(name) %>EntityState extends EntityState<<%= classify(name) %>>, ActiveState { }
<% } else { %>
const initialState = (): <%= classify(name) %> => ({
});

interface <%= classify(name) %>EntityState extends EntityState<<%= classify(name) %>> { }
<% } %>
@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>sState {
  private store = createEntityStore<<%= classify(name) %>EntityState>(initialState(), {
    name: '<%= dasherize(name) %>s',
    idKey: '<%= idKey %>', 
  });
  private query = createEntityQuery<<%= classify(name) %>EntityState>(this.store, {});

  public selectAll = () => this.query.selectAll();
  public selectCount = () => this.query.selectCount();

<% if (active) { %>
  public selectActive = () => this.query.selectActive() as Observable<<%= classify(name) %>>;
  public getActive = () => this.query.getActive() as <%= classify(name) %>;
  public setActive = (id: ID) => this.store.setActive(id);
<% } %>

  constructor(
    private http: HttpClient,
  ) { }

  fetch() {
    const params = new HttpParams();
    return this.http.get <<%= classify(name) %>[]> ('api/<%= dasherize(name) %>', { params }).pipe(
      tap(entities => this.store.set(entities)),
    );
  }
}


/// <reference path="../../../angular2/typings/rx/rx.d.ts" />

import {Component, View, NgFor, Autoconfigured, autobootstrap} from 'angular2/angular2';
export {autobootstrap} from 'angular2/angular2';
import {Http, Response} from 'angular2/http';
import {ObservableWrapper} from 'angular2/src/core/facade/async';

export function main () {
  autobootstrap();
}

@Autoconfigured()
@Component({selector: 'http-app'})
@View({
  directives: [NgFor],
  template: `
    <h1>people</h1>
    <ul class="people">
      <li *ng-for="#person of people">
        hello, {{person['name']}}
      </li>
    </ul>
  `
})
export class HttpCmp {
  people: Object;
  constructor(http: Http) {
    ObservableWrapper.subscribe<Response>(http.get('./people.json'),
                                          res => this.people = res.json());
  }
}

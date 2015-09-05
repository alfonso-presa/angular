import {
  AsyncTestCompleter,
  beforeEach,
  xdescribe,
  ddescribe,
  describe,
  el,
  expect,
  iit,
  inject,
  it
} from 'angular2/test_lib';

import {
  autobootstrap,
  Configuration,
  Autoconfigured
} from 'angular2/src/core/auto_configuration/auto_configuration';

import {Component, Directive, View} from 'angular2/metadata';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {DOCUMENT} from 'angular2/src/core/render/render';
import {bind, Inject, Injector, Injectable} from 'angular2/di';

@Injectable()
class Service {
  constructor() {}
  getMessage() { return 'hello'; }
}

@Autoconfigured()
@Component({selector: 'hello-app'})
@View({template: '{{greeting}} world!'})
class HelloRootCmp {
  greeting: string;
  constructor(service: Service) { this.greeting = service.getMessage(); }
}

@Configuration()
class ConfigureTests {
  getBindings() { return [Service] }
}

export function main() {
  var fakeDoc, el, el2, testBindings, lightDom;

  describe('automatic bootstraping', () => {
    beforeEach(() => {
      fakeDoc = DOM.createHtmlDocument();
      el = DOM.createElement('hello-app', fakeDoc);
      DOM.appendChild(fakeDoc.body, el);
      testBindings = [bind(DOCUMENT).toValue(fakeDoc)];
    });

    it('should display hello world in a sample component', inject([AsyncTestCompleter], (async) => {
         var refPromise = autobootstrap(testBindings);
         refPromise.then((ref) => {
           expect(el).toHaveText('hello world!');
           async.done();
         });
       }));
  });
}
